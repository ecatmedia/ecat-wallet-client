import { satchel } from './satchel'

const findUsableUtxos = (utxos, feePerKb) => {
  let feePerByte = feePerKb / 1024;
  let goodUtxos = utxos.filter(utx => {
    if (utx.confirmations === 0 || utx.inUse) return false;
    if (utx.value > chunkSize * feePerByte - 20000 && utx.value < chunkSize * feePerByte + 20000) {
      return true;
    } else {
      return false;
    }
  });
  return goodUtxos;
};

const sortUtxos = utxos => {
  return utxos.sort((a, b) => {
    if (a.value === b.value) return 0;
    return a.value > b.value ? 1 : -1;
  });
};

