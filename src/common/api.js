import axios from 'axios';
import urls from '../config/urls';

const _axios = axios.create({
  withCredentials: true,
});

const loginUser = async (username, password) => {
  try {
    return await _axios({
      method: 'POST',
      url: urls.auth.login(),
      data: {
        username,
        password,
      },
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const logoutUser = async () => {
  try {
    return await _axios({
      method: 'POST',
      url: urls.auth.logout(),
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const checkProtected = async () => {
  try {
    return await _axios({
      method: 'GET',
      url: urls.auth.protected(),
    });
  } catch (e) {
    console.log(e.response, 'h');
    return e.response;
  }
};

const submitFileInitOnServer = async file => {
  try {
    return await _axios({
      method: 'POST',
      url: urls.files.init(),
      data: file,
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const updateFileParts = async (file, chunks) => {
  try {
    return await _axios({
      method: 'POST',
      url: urls.files.updateParts(file.id),
      data: {
        parts: chunks.map(c => {
          return {
            md5sum: c.checksum,
            pos: { s: c.pos.start, e: c.pos.end },
            txhash: c.tx.hash,
            is_broadcasted: c.is_broadcasted,
          };
        }),
      },
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const updateLinkerTransaction = async (fileId, bcat) => {
  try {
    return await _axios({
      method: 'POST',
      url: urls.files.updateLinker(fileId),
      data: {
        bcat_hash: bcat.hash,
        is_broadcasted: true,
      },
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const checkFileChecksum = async checksum => {
  try {
    return await _axios({
      method: 'GET',
      url: urls.files.checksum(checksum),
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const fetchFileDetails = async fileId => {
  try {
    return await _axios({
      method: 'GET',
      url: urls.files.details(fileId),
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const fetchFilesList = async () => {
  try {
    return await _axios({
      method: 'GET',
      url: urls.files.list(),
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const generateFileToken = async (fileId, token_type, usage_limit) => {
  try {
    return await _axios({
      method: 'POST',
      url: urls.token.create(fileId),
      data: {
        token_type,
        usage_limit,
      },
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const submitIssueReport = async (description, frontPath) => {
  try {
    return await _axios({
      method: 'POST',
      url: urls.report.create(),
      data: {
        description,
        front_path: frontPath,
      },
    });
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const api = {
  loginUser,
  logoutUser,
  checkProtected,
  submitFileInitOnServer,
  checkFileChecksum,
  updateFileParts,
  generateFileToken,
  fetchFilesList,
  fetchFileDetails,
  submitIssueReport,
  updateLinkerTransaction,
};

export default api;
