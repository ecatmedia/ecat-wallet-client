import React, { useState, useContext } from 'react';

import { useBSV } from './bsvContext';
import api from '../common/api';
import { constructEPTransaction, constructLinkerTransaction } from '../lib/transaction';
import { readFileAsync, encryptFile, splitBufferToChunks, generateSecretKey, fileToBuffer } from '../lib/file';
import { satchel } from '../lib/satchel';
import { showNotification } from '../common/notification';
var md5 = require('md5');

function makeStore() {
  // Make a context for the store
  const context = React.createContext();

  // Make a provider that takes an initialValue
  const Provider = ({ children }) => {
    const {
      utxos,
      updateLock,
      setUpdateLock,
      ownerRSAPublicKey,
      satchelKeyFixedAddress,
      satchelKeyNum,
      satchelBroadcastTransaction,
    } = useBSV();
    const [files, setFiles] = useState([]);
    const [readyFiles, setReadyFiles] = useState([]);
    const [filesUploadStatus, setFilesUploadStatus] = useState(() => {});
    let busyUtxos = [];

    const getUnusedUtxos = () => {
      let _inUse = busyUtxos;
      readyFiles.forEach(f => {
        f.chunks.forEach(c => {
          if (c.utxo) _inUse.push(c.utxo);
        });
      });
      return utxos.filter(_u => {
        return _inUse.map(u => JSON.stringify(u)).indexOf(JSON.stringify(_u)) === -1;
      });
    };

    const findGoodUtxo = _c => {
      const unusedUtxos = getUnusedUtxos();
      let found = undefined;
      for (let i = 0; i < unusedUtxos.length; i++) {
        const estSize = Math.ceil((_c.c.byteLength * satchel.feePerKb) / 1024);
        if (unusedUtxos[i].satoshis >= estSize) {
          if (found) {
            if (unusedUtxos[i].satoshis < found.satoshis) {
              found = unusedUtxos[i];
            }
          } else {
            found = unusedUtxos[i];
          }
        }
      }
      return found;
    };

    const processFileTransactions = async (_file, _continue) => {
      // select a good utxo for each part and create the transaction
      // - start a loop over chunks to find a suitable utxo
      let _chunks,
        partTransactions = [];

      if (_continue) {
        const _partsMap = _file.file_parts.map(_p => ({ s: _p.start, e: _p.end, is_broadcasted: _p.transaction.is_broadcasted }));
        _chunks = _file.chunks.map(_c => {
          const _f = _partsMap.filter(_p => _p.s === _c.pos.start && _p.e === _c.pos.end && _p.is_broadcasted);
          if (_f.length > 0) {
            return {
              ..._c,
              part: _f[0],
            };
          }
          return _c;
        });
        _chunks = _chunks.map(_c => {
          if (_c.part) {
            partTransactions.push(_c.part.transaction.tx_hash);
            return {
              ..._c,
              is_broadcasted: true,
            };
          }
          const _utxo = findGoodUtxo(_c);
          busyUtxos.push(_utxo);
          if (!_utxo) {
            throw new Error('Could not find suitable utxo');
          }
          const _tx = constructEPTransaction(_c.c, _utxo, satchelKeyFixedAddress, satchelKeyNum);
          partTransactions.push(_tx.hash);
          return {
            ..._c,
            tx: _tx,
            utxo: {
              outputIndex: _utxo.outputIndex,
              txid: _utxo.txid,
              chain: _utxo.chain,
              num: _utxo.num,
            },
          };
        });
      } else {
        _chunks = _file.chunks;
        for (let i = 0; i < _file.chunks.length; i++) {
          const _c = _file.chunks[i];
          const _utxo = findGoodUtxo(_c);
          busyUtxos.push(_utxo);
          if (!_utxo) {
            throw new Error('Could not find suitable utxo');
          }

          const _tx = constructEPTransaction(_c.c, _utxo, satchelKeyFixedAddress, satchelKeyNum);
          partTransactions.push(_tx.hash);
          _chunks[i].tx = _tx;
          _chunks[i].utxo = {
            outputIndex: _utxo.outputIndex,
            txid: _utxo.txid,
            chain: _utxo.chain,
            num: _utxo.num,
          };
        }
      }

      // TODO: create bcat tx
      const bcatTransaction = constructLinkerTransaction(
        getUnusedUtxos(),
        partTransactions,
        satchelKeyFixedAddress,
        satchelKeyNum,
        _file.secret,
        ownerRSAPublicKey,
        _file.type,
        _file.name,
        _file.is_encrypted
      );

      busyUtxos = [];
      setFilesUploadStatus(prev => ({
        ...prev,
        [_file.id]: 0,
      }));
      // set ready file
      setReadyFiles(prev => [
        ...prev,
        {
          ..._file,
          bcat: bcatTransaction,
          chunks: _chunks,
        },
      ]);
    };

    const _processFile = async file => {
      const _buffer = await readFileAsync(file);
      let buffer = _buffer;
      let secret, md5Checksum, bufferChunks, uint8View;
      if (file.server) {
        if (!file.used_secret) {
          throw new Error('no used secret found for server file');
        }
        uint8View = new Uint8Array(buffer);
        const _currentChecksum = md5(uint8View);
        if (file.is_encrypted) {
          secret = file.used_secret;
          buffer = await encryptFile(_buffer, secret);
          if (!file.md5_sum) {
            throw new Error('no md5 sum found for server file');
          }
        }
        md5Checksum = file.md5_sum;
        if (md5Checksum !== _currentChecksum) {
          throw new Error('md5 checksums do not match');
        }
        bufferChunks = splitBufferToChunks(buffer);
      } else {
        if (file.is_encrypted) {
          secret = generateSecretKey(50);
          uint8View = new Uint8Array(buffer);
          md5Checksum = md5(uint8View);
          buffer = await encryptFile(_buffer, secret);
        } else {
          buffer = fileToBuffer(_buffer);
          md5Checksum = md5(buffer);
        }
        bufferChunks = splitBufferToChunks(buffer);
      }
      return {
        ...file,
        chunks: bufferChunks,
        md5_sum: md5Checksum,
        encrypted: file.is_encrypted,
        name: file.name,
        size: file.size,
        type: file.type,
        secret,
      };
    };

    const runGetOrCreate = (file, key) => {
      setFiles(prev => {
        if (prev.length === 1) return [];
        prev.splice(key, 1);
        return prev;
      });
      if (updateLock) return getOrCreateFile(file);
      setUpdateLock(true);
      try {
        return getOrCreateFile(file);
      } catch (e) {
        console.log(e);
      }
    };

    const getOrCreateFile = async file => {
      // send a request to server for existing file (md5 check)
      let _temp;
      try {
        _temp = await _processFile(file);
      } catch (e) {
        showNotification('Oh no :(', e.message, 'danger');
        return false;
      }
      const server_checksumCheck = await api.checkFileChecksum(_temp.md5_sum);
      let processedFile;
      if (server_checksumCheck.status === 200) {
        // file exists
        // if exists, get content and add file using those data (run a function to check for chunk matching)
        const server_file = server_checksumCheck.data;
        try {
          processedFile = await _processFile(Object.assign(file, { ...server_file, server: true }));
        } catch (e) {
          showNotification('Oh no :(', e.message, 'danger');
          return false;
        }
        return await processFileTransactions(
          {
            ...server_file,
            ...processedFile,
          },
          true
        );
      } else {
        // file does not exist
        // if not exists, send `init` request and create transactions and get ready for broadcast
        // - send init request
        try {
          processedFile = await _processFile(file);
        } catch (e) {
          showNotification('Oh no :(', e.message, 'danger');
          return false;
        }

        const newFile = {
          name: processedFile.name,
          size: processedFile.size,
          type: processedFile.type,
          md5_sum: processedFile.md5_sum,
          used_secret: processedFile.secret,
          is_encrypted: processedFile.encrypted,
          paid_amount: 0,
          parts_count: processedFile.chunks.length,
          parts: processedFile.chunks.map((chunk, idx) => {
            return {
              order: idx,
              md5_sum: chunk.checksum,
              start: chunk.pos.start,
              end: chunk.pos.end,
              is_broadcasted: false,
            };
          }),
        };
        const server_initFile = await api.submitFileInitOnServer(newFile);
        if (server_initFile.status === 200) {
          // init was success
          return await processFileTransactions(
            {
              ...server_initFile.data,
              ...processedFile,
            },
            false
          );
        } else {
          // init failed!
          showNotification('Oh no :(', 'Initializing file on ecat failed!', 'danger');
        }
      }
    };

    const startFileUpload = async (file, key) => {
      // uploading chunks first
      // if any of the part txs fails, we will not broadcast the linker transaction
      let _chunks = file.chunks;
      const MAX_REQUESTS_COUNT = 3 + file.chunks.length;
      const LEVEL_PERCENT = Math.ceil(100 / MAX_REQUESTS_COUNT);
      let failures = [],
        errors = [];

      if (!file.bcat) {
        showNotification('Oh no :(', 'No linker transaction found. Please try again.', 'danger');
        return false;
      }

      for (let i = 0; i < file.chunks.length; i++) {
        let chunk = file.chunks[i];
        if (!chunk.tx) {
          failures.push(chunk);
          continue;
        }
        const _ok = await satchelBroadcastTransaction(chunk.tx, true);
        if (!_ok) {
          failures.push(chunk);
          continue;
        }
        _chunks[i].is_broadcasted = true;
        setFilesUploadStatus(prev => ({
          ...prev,
          [file.id]: prev[file.id] + LEVEL_PERCENT,
        }));
      }
      console.log('fails', failures);
      _chunks.map(c => (c.is_broadcasted ? c : { ...c, is_broadcasted: false }));
      const server_updateParts = await api.updateFileParts(file, _chunks);
      if (server_updateParts.status !== 200) {
        errors.push('Failed updating on ecat server.');
      }
      setFilesUploadStatus(prev => ({
        ...prev,
        [file.id]: prev[file.id] + LEVEL_PERCENT,
      }));
      if (failures.length > 0) {
        errors.push('Some parts failed while uploading.');
      } else if (!file.bcat) {
        errors.push('No linker transaction found.');
      } else {
        const _ok = await satchelBroadcastTransaction(file.bcat, true);
        if (!_ok) {
          errors.push('Linker transaction broadcast failed!');
        } else {
          setFilesUploadStatus(prev => ({
            ...prev,
            [file.id]: prev[file.id] + LEVEL_PERCENT,
          }));
          const server_updateLinker = await api.updateLinkerTransaction(file.id, file.bcat);
          if (server_updateLinker.status !== 200) {
            errors.push('Failed updating linker on ecat server.');
          }
          setFilesUploadStatus(prev => ({
            ...prev,
            [file.id]: prev[file.id] + LEVEL_PERCENT,
          }));
        }
      }
      console.log(errors);
      if (errors.length === 0) {
        showNotification('Success!', 'Your file uploaded successfuly!', 'success');
      } else {
        errors.forEach(e => {
          showNotification('Oh no :(', e, 'danger');
        });
      }
      // if (errors.length === 0) success
    };

    return (
      <context.Provider
        value={{
          runGetOrCreate,
          files,
          setFiles,
          readyFiles,
          setReadyFiles,
          startFileUpload,
          filesUploadStatus,
        }}
      >
        {children}
      </context.Provider>
    );
  };

  const useStore = () => useContext(context);

  return [Provider, useStore];
}

const [UploadProvider, useUpload] = makeStore();

export { UploadProvider, useUpload };
