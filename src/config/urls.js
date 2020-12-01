const env = process.env.NODE_ENV;
const API_BASE_URL = env === 'production' ? 'https://api.ecat.media/api/v1' : 'https://api.ecat.media/api/v1';
const READER_BASE_URL = env === 'production' ? 'https://read.ecat.media' : 'https://read.ecat.media';

const urls = {
  reader: () => `${READER_BASE_URL}`,
  auth: {
    login: () => `${API_BASE_URL}/auth/login`,
    logout: () => `${API_BASE_URL}/auth/logout`,
    register: () => `${API_BASE_URL}/auth/register`,
    protected: () => `${API_BASE_URL}/auth/protected`,
    refresh: () => `${API_BASE_URL}/auth/refresh`,
  },
  files: {
    list: () => `${API_BASE_URL}/files/list`,
    checksum: (checksum) => `${API_BASE_URL}/files/check/${checksum}`,
    init: () => `${API_BASE_URL}/files/init`,
    details: (fileId) => `${API_BASE_URL}/files/${fileId}`,
    update: (fileId) => `${API_BASE_URL}/files/${fileId}/update`,
    setParts: (fileId) => `${API_BASE_URL}/files/${fileId}/set-parts`,
    ackTx: (fileId) => `${API_BASE_URL}/files/${fileId}/ack-tx`,
    updateParts: (fileId) => `${API_BASE_URL}/files/${fileId}/update-parts`,
    updateLinker: (fileId) => `${API_BASE_URL}/files/${fileId}/update-linker`,
  },
  token: {
    create: (fileId) => `${API_BASE_URL}/files/${fileId}/token/create/`,
    revoke: () => `${API_BASE_URL}/files/token/revoke/`,
  },
  report: {
    create: () => `${API_BASE_URL}/report/create`,
  },
};

export default urls;
