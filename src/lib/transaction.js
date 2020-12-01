import { satchel } from './satchel';

const cryptico = require('cryptico');
const BSV = require('bsv');

const chunkSize = 90e3;
const ECAT_PART_HEADER = 'ecat::EPT';
const ECAT_LINKER_HEADER = 'ecat::ECT';
const sjcl = window.sjcl;

const findUsableUtxos = (utxos, feePerKb) => {
  let feePerByte = feePerKb / 1024;
  let goodUtxos = utxos.filter((utx) => {
    if (utx.confirmations === 0 || utx.inUse) return false;
    if (utx.value > chunkSize * feePerByte - 20000 && utx.value < chunkSize * feePerByte + 20000) {
      return true;
    } else {
      return false;
    }
  });
  return goodUtxos;
};

const getOPReturnValueSum = (tx) => {
  let sum = 0;
  tx.outputs.forEach((out) => {
    sum += out._scriptBuffer.byteLength;
  });
  return sum;
};

const getPublicKeyFromPrivateKey = (ownerRSAKey) => {
  try {
    const RSAKey = cryptico.RSAKey.parse(ownerRSAKey);
    let owner_pub_pem = cryptico.publicKeyString(RSAKey);
    return owner_pub_pem;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const createDecryptionKey = (secret, pubKey, isEcat) => {
  if (isEcat) {
    try {
      return cryptico.encrypt(secret, pubKey).cipher;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
  try {
    let pub = new sjcl.ecc.elGamal.publicKey(sjcl.ecc.curves.c256, sjcl.codec.base64.toBits(pubKey));
    return JSON.parse(sjcl.encrypt(pub, secret)).ct;
  } catch (e) {
    return undefined;
  }
};

const constructLinkerTransaction = (
  utxos,
  transactions,
  change,
  satchelKeyNum,
  fileSecret,
  ownerRSAPublicKey,
  fileType,
  fileName,
  isEncrypted
) => {
  let encryptedKeys = [];

  if (!ownerRSAPublicKey) {
    return false;
  }

  let ecat_pub_pem =
    '<YOUR_ECAT_PUBLIC_KEY_PEM>';

  if (isEncrypted) {
    var encrypted4owner = createDecryptionKey(fileSecret, ownerRSAPublicKey, false);
    if (!encrypted4owner) {
      return false;
    }

    encryptedKeys.push(encrypted4owner, 'okey');
    var encrypted4ecat = createDecryptionKey(fileSecret, ecat_pub_pem, true);
    if (!encrypted4ecat) {
      return false;
    }
    encryptedKeys.push(encrypted4ecat, 'eckey');
  } else {
    encryptedKeys.push('', 'okey', '', 'eckey');
  }

  let bcatBody = BSV.Script.buildDataOut([
    ECAT_LINKER_HEADER,
    'type',
    fileType,
    BSV.deps.Buffer.from('20', 'hex'),
    'name',
    fileName,
    BSV.deps.Buffer.from('20', 'hex'),
    ...encryptedKeys,
    ...transactions,
  ]);
  let neededValue = bcatBody.toBuffer().byteLength * (satchel.feePerKb / 1024);
  let finished = false,
    bcatUtxos = [];
  for (let i = 0; i < utxos.length; i++) {
    bcatUtxos.push(utxos[i]);
    if (bcatUtxos.reduce((a, b) => +a + +b.value, 0) >= neededValue) {
      finished = true;
      break;
    }
  }
  if (!finished) {
    throw new Error('not enough utxos for creating linker transactio');
  }
  let script = new BSV.Script();
  script.add(BSV.Opcode.OP_FALSE);
  script.add(bcatBody);
  let bcatTx = BSV.Transaction()
    .from(bcatUtxos)
    .addOutput(BSV.Transaction.Output({ script, satoshis: 0 }))
    .change(change)
    .feePerKb(satchel.feePerKb);

  // sign bcat transaction
  let pvk = satchel.lookupPrivateKey(0, satchelKeyNum);
  bcatTx.sign(pvk);
  return bcatTx;
};

const constructEPTransaction = (buffer, utxo, change, num, order = undefined) => {
  let tx = new BSV.Transaction().from(utxo);
  let script = new BSV.Script();
  script.add(BSV.Opcode.OP_FALSE);
  try {
    let _b = BSV.Script.buildDataOut([ECAT_PART_HEADER, buffer]);
    script.add(_b);
  } catch (e) {
    console.log(e);
  }
  const pvKey = satchel.lookupPrivateKey(0, num);
  tx.addOutput(BSV.Transaction.Output({ script, satoshis: 0 }))
    .change(change)
    .feePerKb(satchel.feePerKb)
    .sign(pvKey);

  return tx;
};

const constructMoneyButtonTransaction = (megabytes, address) => {
  const mb = parseFloat(megabytes);
  let satoshis = Math.ceil(mb * 1024 * satchel.feePerKb);
  const chunkSize = 90e3;
  const feePerByte = satchel.feePerKb / 1024;
  const chunkPrice = Math.ceil(chunkSize * feePerByte);

  let outputs = [];
  while (satoshis > 0) {
    if (satoshis > chunkPrice) {
      outputs.push({
        to: address,
        amount: satchel.sat2bsv(chunkPrice),
        currency: 'BSV',
      });
      satoshis -= chunkPrice;
    } else {
      outputs.push({
        to: address,
        amount: satchel.sat2bsv(satoshis),
        currency: 'BSV',
      });
      satoshis = 0;
    }
  }
  return outputs;
};

const constructECATPaymentMoneyButtonTx = (satoshis) => {
  const ecatWallet = '';
  return [
    {
      to: ecatWallet,
      amount: satchel.sat2bsv(satoshis),
      currency: 'BSV',
    },
  ];
};

const constructTransactionForUtxoRecycling = (utxos) => {
  let total = utxos.reduce((a, b) => a + b.value, 0);
  const chunkSize = 90e3;
  const feePerByte = satchel.feePerKb / 1024;
  const chunkPrice = Math.ceil(chunkSize * feePerByte);

  const address = satchel.address();
  let tx = new BSV.Transaction().from(utxos).change(address);

  while (total > tx.getFee() + chunkPrice) {
    tx.to(address, chunkPrice);
    total -= chunkPrice;
  }

  for (let i in utxos) {
    const pv = satchel.lookupPrivateKey(utxos[i].chain, utxos[i].num);
    tx.sign(pv);
  }

  return tx;
};

export {
  createDecryptionKey,
  findUsableUtxos,
  getOPReturnValueSum,
  getPublicKeyFromPrivateKey,
  constructMoneyButtonTransaction,
  constructECATPaymentMoneyButtonTx,
  constructTransactionForUtxoRecycling,
  constructEPTransaction,
  constructLinkerTransaction,
};
