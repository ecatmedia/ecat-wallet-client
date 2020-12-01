var CryptoJS = require('crypto-js');
var md5 = require('md5');

const chunkSize = 90e3;

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const _arrayBufferToBase64 = buffer => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const generateSecretKey = length => {
  var randomstring = '';
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()';

  for (var i = 0; i < length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};

const encryptFile = async (buffer, secret) => {
  const dataBase64 = _arrayBufferToBase64(buffer);
  const encryptedFile = CryptoJS.AES.encrypt(dataBase64, secret);
  const _buffer = new Buffer(encryptedFile.toString(), 'base64');
  return _buffer;
};

const fileToBuffer = buffer => {
  const dataBase64 = _arrayBufferToBase64(buffer);
  const _buffer = new Buffer(dataBase64, 'base64');
  return _buffer;
};

const splitBufferToChunks = buffer => {
  const chunks = buffer.byteLength / chunkSize;
  let fileChunks = [];
  for (let i = 0; i < chunks; i++) {
    let _c = {
      c: buffer.slice(i * chunkSize, (i + 1) * chunkSize),
      pos: {
        start: i * chunkSize,
        end: (i + 1) * chunkSize,
      },
      checksum: md5(buffer.slice(i * chunkSize, (i + 1) * chunkSize)),
    };
    fileChunks.push(_c);
  }
  return fileChunks;
};

export { readFileAsync, generateSecretKey, encryptFile, splitBufferToChunks, fileToBuffer };
