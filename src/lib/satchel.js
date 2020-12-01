import axios from 'axios';

const bsv = require('bsv');
const Mnemonic = require('bsv/mnemonic');
const sb = require('satoshi-bitcoin');

// Standard dust limit (minimum)
const dustLimit = 546;

// Fee per kilobyte, used for calculating fees
const feePerKb = 1100;

// Multiplier used for calculating estimated fees
const feeEstimatedMultiplier = 1.4;

// BSV Explorer service provider
const explorerProvider = 'https://whatsonchain.com';

// Initialize the application
const app = {
  bitIndexApiKey: '<BITINDEX_API_KEY>',
  bsv: bsv,
  feePerKb: feePerKb,
  mnemonic: Mnemonic,
  planariaApiKey: '',
  planariaUrl: '<PLANARIA_URL>',
  rpc: '<BSV_RPC_SERVER>',
  updateDebounce: 10000,

  // this must be set to enable bitsocket
  bitsocketCallback: null,
  bitsocketUrl: '<BITSOCKET_URL>',
  debug: false,
  socket: null,
};

// localStorage standard keys for satchel
const StorageKeys = {
  SatchelKeyConfirmedBalance: 'satchel.confirmed-balance',
  SatchelKeyMnemonic: 'satchel.mnemonic',
  SatchelKeyNum: 'satchel.num',
  SatchelKeyTimestamp: 'satchel.timestamp',
  SatchelKeyUnConfirmedBalance: 'satchel.unconfirmed-balance',
  SatchelKeyUtxo: 'satchel.utxo',
  SatchelKeyXPriv: 'satchel.xpriv',
  SatchelKeyXPub: 'satchel.xpub',
  SatchelSetup: 'satchel.setup',
  SatchelFixedAddress: 'sachel.fixed-address',
};

// jsonHeader returns a header for JSON
const jsonHeader = () => {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
  };
};

// bitindexHeader returns a header for bitindex with API key
const bitindexHeader = () => {
  let header = jsonHeader();
  header.api_key = app.bitIndexApiKey;
  return header;
};

// sat2bsv converts satoshis to bitcoin
app.sat2bsv = sat => sb.toBitcoin(sat);

// bsv2sat converts bitcoin to satoshis
app.bsv2sat = bsv => sb.toSatoshi(bsv) | 0;

// changeAddress returns a bsv.Address
app.changeAddress = () => {
  let changeKey = app.lookupPrivateKey(1, localStorage.getItem(StorageKeys.SatchelKeyNum));
  return bsv.Address.fromPrivateKey(changeKey, 'livenet');
};

// address returns a bsv.Address
app.address = () => {
  let pubKey = app.publicKey();
  return bsv.Address.fromPublicKey(pubKey, 'livenet');
};

// balance returns the total balance (confirmed and unconfirmed)
app.balance = () => {
  return app.confirmedBalance() + app.unconfirmedBalance();
};

// confirmedBalance returns just the confirmed balance
app.confirmedBalance = () => parseInt(localStorage.getItem(StorageKeys.SatchelKeyConfirmedBalance) || 0);

// unconfirmedBalance returns just the unconfirmed balance
app.unconfirmedBalance = () => parseInt(localStorage.getItem(StorageKeys.SatchelKeyUnConfirmedBalance) || 0);

// hdPrivateKey gets a hd private key
app.hdPrivateKey = () => new bsv.HDPrivateKey.fromString(app.xPriv());

// hdPublicKey gets a hd xpub key
app.hdPublicKey = () => new bsv.HDPrivateKey.fromString(app.xPub());

// mnemonic returns the local mnemonic
app.mnemonic = () => localStorage.getItem(StorageKeys.SatchelKeyMnemonic);

// timestamp returns the local stored timestamp
app.timestamp = () => localStorage.getItem(StorageKeys.SatchelKeyTimestamp);

// xPriv returns the local stored xpriv
app.xPriv = () => localStorage.getItem(StorageKeys.SatchelKeyXPriv);

// xPub returns the local stored xpub
app.xPub = () => localStorage.getItem(StorageKeys.SatchelKeyXPub);

// privateKey returns the current private key
app.privateKey = () => {
  // Get derived HD number
  let num = localStorage.getItem(StorageKeys.SatchelKeyNum) || 0;

  // If we don't have one, ask BitIndex
  if (!num || num.length === 0) {
    console.error('login first', num);
    throw new Error('login first');
  }

  return app.lookupPrivateKey(0, num);
};

// publicKey returns the current public key
app.publicKey = () => app.privateKey().publicKey;

// isLoggedIn check if user is logged into the wallet
app.isLoggedIn = () => !!app.xPriv();

// lookupPrivateKey returns a bsv.PrivateKey
app.lookupPrivateKey = (chain, num) => {
  let hdPrivateKey = app.hdPrivateKey();
  if (!hdPrivateKey) {
    throw new Error('hd key must be set before looking up a child key');
  }
  let u = hdPrivateKey.deriveChild('m/' + chain + '/' + num).privateKey;
  return u;
};

// utxos a wallet can have many utxos consume the top `max` utxos by value
app.utxos = (max = 100) => {
  let utxos = JSON.parse(localStorage.getItem(StorageKeys.SatchelKeyUtxo) || '[]');

  if (!utxos || !max) {
    return utxos;
  }

  return utxos
    .sort((a, b) => {
      return a.satoshis > b.satoshis ? -1 : 1;
    })
    .slice(0, max);
};

// new generates a new mnemonic and logs in (english only for now)
app.new = async () => {
  let mnemonic = Mnemonic.fromRandom();
  await app.login(mnemonic.toString());
  return mnemonic;
};

// login with xPriv or Mnemonic
app.login = async (xprvOrMnemonic, loadingCallback) => {
  loadingCallback(true);
  if (!xprvOrMnemonic) {
    throw new Error('Private key required');
  }

  let hdPrivateKey;

  if (xprvOrMnemonic.split(' ').length === 12) {
    if (!Mnemonic.isValid(xprvOrMnemonic)) {
      throw new Error('Invalid mnemonic');
    }
    const importedMnemonic = Mnemonic.fromString(xprvOrMnemonic);
    hdPrivateKey = bsv.HDPrivateKey.fromSeed(importedMnemonic.toSeed(), 'livenet');
    localStorage.setItem(StorageKeys.SatchelKeyMnemonic, xprvOrMnemonic);
  } else {
    hdPrivateKey = bsv.HDPrivateKey.fromString(xprvOrMnemonic);
  }

  localStorage.setItem(StorageKeys.SatchelKeyXPriv, hdPrivateKey.toString());
  localStorage.setItem(StorageKeys.SatchelKeyXPub, bsv.HDPublicKey.fromHDPrivateKey(hdPrivateKey).toString());

  await app.updateAll();
  loadingCallback(false);
};

// updateAll updates if app.timestamp is older than app.updateDebounce
app.updateAll = async loadingCallback => {
  loadingCallback && loadingCallback(true);
  let ts = app.timestamp();
  if (!ts || new Date().getTime() - parseInt(ts) > app.updateDebounce) {
    // Gets next key pair position so we can derive keys
    localStorage.setItem(StorageKeys.SatchelKeyTimestamp, new Date().getTime().toString());
    // await app.next()
    await app.updateBalance();
    await app.updateUtxos();
  }
  loadingCallback && loadingCallback(false);
};

// logout clears keys from localStorage
app.logout = () => {
  // Find all keys
  const localstorageKeys = [];
  for (let i = 0; i < localStorage.length; ++i) {
    if (localStorage.key(i).substring(0, 7) === 'satchel') {
      localstorageKeys.push(localStorage.key(i));
    }
  }

  // Remove all keys
  for (const k of localstorageKeys) {
    localStorage.removeItem(k);
  }
};

// newDataTx new data transaction, returns a new tx
app.newDataTx = async (data, address, satoshis) => {
  if (!app.isLoggedIn()) {
    throw new Error('satchel: sending without being logged in');
  }

  let tx = new bsv.Transaction(); // todo: missing parameter?
  tx.from(app.utxos());

  if (address && satoshis > 0) {
    if (!bsv.Address.isValid(address, 'livenet', 'pubkey')) {
      throw new Error('satchel: invalid address');
    }
    tx.to(address, satoshis);
  }

  tx = app.addOpReturnData(tx, data);
  tx.feePerKb(app.feePerKb);
  tx.change(app.changeAddress());

  tx = app.cleanTxDust(tx);

  let utxos = app.utxos();
  for (let i in utxos) {
    let pk = app.lookupPrivateKey(utxos[i].chain, utxos[i].num);
    tx.sign(pk); // todo: missing second parameter
  }

  return tx;
};

// addOpReturnData adds op_return data to txt
app.addOpReturnData = (tx, data) => {
  const script = new bsv.Script();
  script.add(bsv.Opcode.OP_RETURN);

  for (const m in data) {
    // Detect hex prefix
    if (data[m].startsWith('0x')) {
      script.add(Buffer.from(data[m].substring(2), 'hex'));
    } else {
      // Otherwise, assume string
      script.add(Buffer.from(data[m]));
    }
  }

  tx.addOutput(
    new bsv.Transaction.Output({
      script: script,
      satoshis: 0,
    })
  );

  return tx;
};

// broadcastTx broadcast the tx
app.broadcastTx = async (
  tx,
  options = {
    safe: true, // check serialization
    testing: false, // if true dont actually broadcast to network
  }
) => {
  let txData;
  if (options.safe) {
    txData = tx.serialize();
  } else {
    txData = tx.uncheckedSerialize();
  }

  if (options.testing) {
    return tx;
  } else {
    try {
      const res = await axios({
        method: 'POST',
        url: app.rpc + '/api/v3/main/tx/send',
        data: { rawtx: txData },
        json: true,
      });
      return res.data;
    } catch (e) {
      throw new Error(e);
    }
  }
};

// updateBalance update the balance from rpc provider
app.updateBalance = async () => {
  let addrInfo;
  try {
    const res = await axios({
      method: 'GET',
      url: app.rpc + '/api/v3/main/addr/' + app.fixedAddress(),
      headers: bitindexHeader(),
    });
    addrInfo = res.data;
  } catch (e) {
    throw new Error(e);
  }

  // todo: check that we got the right values (confirmed, unconfirmed, etc)

  localStorage.setItem(StorageKeys.SatchelKeyConfirmedBalance, addrInfo.balance);
  localStorage.setItem(StorageKeys.SatchelKeyUnConfirmedBalance, addrInfo.unconfirmedBalance);
  return app.balance();
};

// updateUtxos update utxos from rpc provider
app.updateUtxos = async () => {
  let utxos;
  try {
    const res = await axios({
      method: 'GET',
      url: app.rpc + '/api/v3/main/addrs/' + app.fixedAddress() + '/utxo',
      headers: bitindexHeader(),
    });
    utxos = res.data;
    if (!utxos) {
      utxos = [];
    }
  } catch (e) {
    throw new Error(e);
  }

  if (utxos instanceof Array) {
    utxos.sort((a, b) => (a.satoshis > b.satoshis ? 1 : a.satoshis < b.satoshis ? -1 : 0));
  }

  localStorage.setItem(StorageKeys.SatchelKeyUtxo, JSON.stringify(utxos));
  return utxos;
};

export { app as satchel, StorageKeys };
