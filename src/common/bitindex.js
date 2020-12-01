import axios from 'axios';
import { satchel } from '../lib/satchel';

const BITINDEX_API_BASE_URL = satchel.rpc + '/api/v3/main/';

const jsonHeader = () => {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
  };
};

const bitindexHeader = () => {
  let header = jsonHeader();
  header.api_key = satchel.bitIndexApiKey;
  return header;
};

const getUtxosForAddress = async address => {
  try {
    return await axios({
      method: 'GET',
      url: BITINDEX_API_BASE_URL + 'addr/' + address + '/utxo',
      headers: bitindexHeader(),
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const getBalanceForAddress = async address => {
  try {
    return await axios({
      method: 'GET',
      url: BITINDEX_API_BASE_URL + 'addr/' + address,
      headers: bitindexHeader(),
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const getNextAddressForXpub = async xpub => {
  try {
    return await axios({
      method: 'GET',
      url: BITINDEX_API_BASE_URL + 'xpub/' + xpub + '/addrs/next?reserveTime=3600',
      headers: bitindexHeader(),
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const broadcastTransaction = async txData => {
  try {
    return await axios({
      method: 'POST',
      url: BITINDEX_API_BASE_URL + 'tx/send',
      data: { rawtx: txData },
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const bitindexAPI = {
  getUtxosForAddress,
  getBalanceForAddress,
  getNextAddressForXpub,
  broadcastTransaction,
};

export default bitindexAPI;
