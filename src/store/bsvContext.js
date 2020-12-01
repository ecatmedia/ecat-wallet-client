import React, { useState, useContext, useEffect } from 'react';
import { saveAs } from 'file-saver';

import { satchel, StorageKeys } from '../lib/satchel';
import { readFileAsync } from '../lib/file';
import userInterval from './useInterval';
import bitindexAPI from '../common/bitindex';
import useInterval from './useInterval';

const Mnemonic = require('bsv/mnemonic');
const BSV = require('bsv');

function makeStore() {
  // Make a context for the store
  const context = React.createContext();

  const useLocalStorageState = key => {
    const [state, setState] = useState(() => {
      return localStorage.getItem(key);
    });

    return [
      state,
      value => {
        localStorage.setItem(key, value);
        setState(value);
      },
    ];
  };

  const Provider = ({ initialValue = {}, children }) => {
    useEffect(() => {
      const config = {
        [StorageKeys.SatchelKeyConfirmedBalance]: 0,
        [StorageKeys.SatchelKeyMnemonic]: '',
        [StorageKeys.SatchelKeyNum]: '',
        [StorageKeys.SatchelKeyTimestamp]: '',
        [StorageKeys.SatchelKeyUnConfirmedBalance]: 0,
        [StorageKeys.SatchelKeyUtxo]: '[]',
        [StorageKeys.SatchelKeyXPriv]: '',
        [StorageKeys.SatchelKeyXPub]: '',
        [StorageKeys.SatchelFixedAddress]: '',
        [StorageKeys.SatchelSetup]: false,
      };

      Object.keys(StorageKeys).forEach(k => {
        if (Object.keys(localStorage).indexOf(StorageKeys[k]) === -1)
          localStorage.setItem(StorageKeys[k], config[StorageKeys[k]]);
      });
    }, []);

    const [isAccountSetupComplete, setIsAccountSetupComplete] = useState(() => false);
    const [updateInterval, setUpdateInterval] = useState(() => 12000);
    const [ownerRSASecretKey, setOwnerRSASecretKey] = useLocalStorageState('ecat.ownerRASSecretKey');
    const [ownerRSAPublicKey, setOwnerRSAPublicKey] = useLocalStorageState('ecat.ownerRASPublicKey');
    const [hasBackupBefore, setHasBackupBefore] = useLocalStorageState('ecat.hasBackupBefore');
    const [isRSAValid, setIsRSAVaild] = useState(() => false);

    const [_utxos, setUtxos] = useLocalStorageState(StorageKeys.SatchelKeyUtxo);
    const utxos = JSON.parse(_utxos);
    const [confirmedBalance, setConfirmedBalance] = useLocalStorageState(StorageKeys.SatchelKeyConfirmedBalance);
    const [unconfirmedBalance, setUnconfirmedBalance] = useLocalStorageState(StorageKeys.SatchelKeyUnConfirmedBalance);
    const [satchelKeyMnemonic, setSatchelKeyMnemonic] = useLocalStorageState(StorageKeys.SatchelKeyMnemonic);
    const [satchelKeyXPriv, setSatchelKeyXPriv] = useLocalStorageState(StorageKeys.SatchelKeyXPriv);
    const [satchelKeyXPub, setSatchelKeyXPub] = useLocalStorageState(StorageKeys.SatchelKeyXPub);
    const [satchelKeyNum, setSatchelKeyNum] = useLocalStorageState(StorageKeys.SatchelKeyNum);
    const [satchelKeyFixedAddress, setSatchelKeyFixedAddress] = useLocalStorageState(StorageKeys.SatchelFixedAddress);
    const [satchelKeyTimestamp, setSatchelKeyTimeStamp] = useLocalStorageState(StorageKeys.SatchelKeyTimestamp);
    const [isSatchelSetup, setIsSatchelSetup] = useLocalStorageState(StorageKeys.SatchelSetup);

    const [updateLock, setUpdateLock] = useState(() => false);
    const [loadingStates, setLoadingStates] = useState(() => ({
      login: false,
      utxos: false,
      balance: false,
      rsaGenerating: false,
      satchelLogin: false,
    }));
    const [errorStates, setErrorStates] = useState(() => ({
      login: '',
      utxos: '',
      rsaGenerating: '',
    }));

    const isLoggedIn = () => {
      return !!satchelKeyXPriv;
    };

    const satchelNewWallet = async () => {
      try {
        let mnemonic = Mnemonic.fromRandom();
        await satchelLogin(mnemonic.toString());
        return mnemonic;
      } catch (e) {
        setErrorStates(prev => ({
          ...prev,
          login: e.message,
        }));
      }
    };

    const satchelRestoreWallet = async priv => {
      try {
        await satchelLogin(priv);
      } catch (e) {
        setErrorStates(prev => ({
          ...prev,
          login: e.message,
        }));
      }
    };

    const satchelRestoreBackup = async backup => {
      const sjcl = window.sjcl;
      try {
        // parsing backup file
        const backupData = await readFileAsync(backup);
        const profile = _convertBackupKeyToJson(backupData);
        let priv = profile.bitcoinMnemonic || profile.bitcoinXPriv;
        await satchelLogin(priv, profile.bitcoinAddress, profile.bitcoinFixedNum);

        if (profile.rsaPrivateKey) {
          new sjcl.ecc.elGamal.secretKey(
            sjcl.ecc.curves.c256,
            sjcl.ecc.curves.c256.field.fromBits(sjcl.codec.base64.toBits(profile.rsaPrivateKey))
          );
          if (!profile.rsaPublicKey) {
            throw new Error('No corresponding public key found for the provided private key!');
          }
          setOwnerRSAPublicKey(profile.rsaPublicKey);
          setOwnerRSASecretKey(profile.rsaPrivateKey);
        }
      } catch (e) {
        setErrorStates(prev => ({
          ...prev,
          login: e.message,
        }));
      }
    };

    const satchelSetupFixedAddress = async xpub => {
      const resp = await bitindexAPI.getNextAddressForXpub(xpub);
      if (resp.status === 200) {
        if (resp.data instanceof Array) {
          const g = resp.data.filter(a => {
            return a.chain === 0;
          })[0];
          setSatchelKeyNum(g.num.toString());
          setSatchelKeyFixedAddress(g.address);
        }
      }
    };

    const satchelLogin = async (xprvOrMnemonic, fixedAddress, fixedNum) => {
      setLoadingStates(prev => ({
        ...prev,
        login: true,
      }));
      if (!xprvOrMnemonic) {
        throw new Error('Private key required');
      }

      let hdPrivateKey;
      if (xprvOrMnemonic.split(' ').length === 12) {
        // input is mnemonic
        if (!Mnemonic.isValid(xprvOrMnemonic)) {
          throw new Error('Invalid mnemonic');
        }
        const importedMnemonic = Mnemonic.fromString(xprvOrMnemonic);
        hdPrivateKey = BSV.HDPrivateKey.fromSeed(importedMnemonic.toSeed(), 'livenet');
        setSatchelKeyMnemonic(xprvOrMnemonic);
      } else {
        hdPrivateKey = BSV.HDPrivateKey.fromString(xprvOrMnemonic);
      }
      setSatchelKeyXPriv(hdPrivateKey.toString());
      const _xpub = BSV.HDPublicKey.fromHDPrivateKey(hdPrivateKey).toString();
      setSatchelKeyXPub(_xpub);
      setIsSatchelSetup('true');

      let needAddress = true;
      if (fixedAddress) {
        setSatchelKeyNum(fixedNum ? fixedNum : 0);
        setSatchelKeyFixedAddress(fixedAddress);
        needAddress = false;
      }

      if (needAddress) {
        await satchelSetupFixedAddress(_xpub);
      }

      await satchelUpdateAll();
      setLoadingStates(prev => ({
        ...prev,
        login: false,
      }));
    };

    const satchelLogout = () => {
      // cleaning all local storage keys
      setSatchelKeyMnemonic('');
      setSatchelKeyXPriv('');
      setSatchelKeyXPub('');
      setSatchelKeyFixedAddress('');
      setUtxos('[]');
      setConfirmedBalance(0);
      setUnconfirmedBalance(0);
      setOwnerRSAPublicKey('');
      setOwnerRSASecretKey('');
      setHasBackupBefore('');
      for (const k of Object.keys(StorageKeys)) {
        localStorage.removeItem(k);
      }
    };

    const satchelUpdateAll = async () => {
      if (updateLock) return false;
      if (!satchel.isLoggedIn()) return false;
      if (!satchelKeyTimestamp || new Date().getTime() - parseInt(satchelKeyTimestamp) > satchel.updateDebounce) {
        setSatchelKeyTimeStamp(new Date().getTime().toString());
        await satchelUpdateBalance();
        await satchelUpdateUtxos();
      }
    };

    const satchelUpdateUtxos = async () => {
      if (updateLock) return false;
      setLoadingStates(prev => ({
        ...prev,
        utxos: true,
      }));
      let utxos = [];
      const resp = await bitindexAPI.getUtxosForAddress(satchelKeyFixedAddress);
      if (resp.status === 200) {
        utxos = resp.data;
        if (!utxos) utxos = [];
        utxos.sort((a, b) => (a.satoshis > b.satoshis ? 1 : a.satoshis < b.satoshis ? -1 : 0));
        setUtxos(JSON.stringify(utxos));
      }
      setUtxos(JSON.stringify(utxos));
      setLoadingStates(prev => ({
        ...prev,
        utxos: false,
      }));
    };

    const broadcastMock = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const satchelBroadcastTransaction = async (tx, dev) => {
      const txData = tx.uncheckedSerialize();
      if (dev) {
        await broadcastMock(1000);
        return true;
      }
      const resp = await bitindexAPI.broadcastTransaction(txData);
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    };

    const satchelUpdateBalance = async () => {
      if (updateLock) return false;
      setLoadingStates(prev => ({
        ...prev,
        balance: true,
      }));
      const resp = await bitindexAPI.getBalanceForAddress(satchelKeyFixedAddress);
      let _confirmedBalance = 0,
        _unconfirmedBalance = 0;
      if (resp && resp.status === 200) {
        _confirmedBalance = resp.data.balance;
        _unconfirmedBalance = resp.data.unconfirmedBalance;
      }
      setConfirmedBalance(_confirmedBalance);
      setUnconfirmedBalance(_unconfirmedBalance);
      setLoadingStates(prev => ({
        ...prev,
        balance: false,
      }));
    };

    const satchelGenerateRSAKey = () => {
      const sjcl = window.sjcl;
      const pair = sjcl.ecc.elGamal.generateKeys(256);
      const _pub = pair.pub.get(),
        _sec = pair.sec.get();
      const pub = sjcl.codec.base64.fromBits(_pub.x.concat(_pub.y));
      const sec = sjcl.codec.base64.fromBits(_sec);
      setOwnerRSAPublicKey(pub);
      setOwnerRSASecretKey(sec);
    };

    const _constructBackupFile = () => {
      const profile = {
        bitcoinXPriv: satchelKeyXPriv,
        bitcoinMnemonic: satchelKeyMnemonic,
        bitcoinAddress: satchelKeyFixedAddress,
        bitcoinFixedNum: satchelKeyNum,
        rsaPrivateKey: ownerRSASecretKey,
        rsaPublicKey: ownerRSAPublicKey,
      };

      const buffer = Buffer.from(JSON.stringify(profile)).toString('base64');
      const body = new Blob([buffer], { type: 'text/json;charset=utf-8' });
      return body;
    };

    const _convertBackupKeyToJson = keyBuffer => {
      let view = new Uint8Array(keyBuffer);
      const enc = new TextDecoder('utf-8');
      let buf = enc.decode(view);
      const baseStr = atob(buf);
      const baseJson = JSON.parse(baseStr);
      return baseJson;
    };

    const downloadBackup = () => {
      const body = _constructBackupFile();
      saveAs(body, 'ecat_backup.key');
      setHasBackupBefore(true);
    };

    useEffect(() => {
      const sjcl = window.sjcl;
      try {
        new sjcl.ecc.elGamal.secretKey(
          sjcl.ecc.curves.c256,
          sjcl.ecc.curves.c256.field.fromBits(sjcl.codec.base64.toBits(ownerRSASecretKey))
        );
        setIsRSAVaild(true);
      } catch (e) {
        console.log(e);
        setIsRSAVaild(false);
      }
    }, [ownerRSASecretKey]);

    useEffect(() => {
      if (!ownerRSAPublicKey || !ownerRSASecretKey || !satchelKeyXPriv || !satchelKeyFixedAddress || !isSatchelSetup)
        setIsAccountSetupComplete(false);
      else setIsAccountSetupComplete(true);
    }, [ownerRSASecretKey, ownerRSAPublicKey, satchelKeyXPriv, satchelKeyFixedAddress, isSatchelSetup]);

    useInterval(() => {
      const doWork = async () => {
        if (!isLoggedIn()) return false;
        await satchelUpdateAll();
      };
      doWork();
    }, updateInterval);

    return (
      <context.Provider
        value={{
          isAccountSetupComplete,
          utxos,
          confirmedBalance,
          unconfirmedBalance,
          satchelKeyMnemonic,
          satchelKeyXPriv,
          satchelKeyNum,
          satchelKeyFixedAddress,
          loadingStates,
          errorStates,
          isLoggedIn,
          satchelNewWallet,
          satchelRestoreWallet,
          satchelRestoreBackup,
          isSatchelSetup,
          setUpdateLock,
          updateLock,
          isRSAValid,
          ownerRSASecretKey,
          ownerRSAPublicKey,
          satchelGenerateRSAKey,
          satchelLogout,
          downloadBackup,
          hasBackupBefore,
          satchelBroadcastTransaction,
        }}
      >
        {children}
      </context.Provider>
    );
  };

  const useStore = () => useContext(context);

  return [Provider, useStore];
}

const [BSVProvider, useBSV] = makeStore();

export { BSVProvider, useBSV };
