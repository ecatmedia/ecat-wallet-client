import React, { useState, useContext, useEffect } from 'react';

import api from '../common/api';

function makeStore() {
  // Make a context for the store
  const context = React.createContext();

  // Make a provider that takes an initialValue
  const Provider = ({ initialValue = {}, children }) => {
    const [fileDetails, setFileDetails] = useState(() => ({ isLoading: true, data: {} }));
    const [normalTokenInfo, setNormalTokenInfo] = useState(() => ({ isLoading: true, data: {} }));
    const [paidTokenInfo, setPaidTokenInfo] = useState(() => ({ isLoading: true, data: {} }));

    const fetchFileDetails = async (fileId) => {
      setFileDetails((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const res = await api.fetchFileDetails(fileId);
      if (res.status === 200) {
        setFileDetails({
          isLoading: false,
          data: res.data,
        });
      }
      setFileDetails((prev) => ({
        ...prev,
        isLoading: false,
      }));
    };

    const generateNormalToken = async (fileId, usageLimit) => {
      setNormalTokenInfo((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const res = await api.generateFileToken(fileId, 'normal', usageLimit);
      console.log('gogog res', res);
      if (res && res.status === 200) {
        setNormalTokenInfo({
          isLoading: false,
          data: res.data,
        });
        return true;
      }
      setNormalTokenInfo((prev) => ({
        ...prev,
        isLoading: false,
      }));
      return true;
    };

    return (
      <context.Provider
        value={{
          fileDetails,
          normalTokenInfo,
          paidTokenInfo,
          fetchFileDetails,
          generateNormalToken,
        }}
      >
        {children}
      </context.Provider>
    );
  };

  // A hook to help consume the store
  const useStore = () => useContext(context);

  return [Provider, useStore];
}

const [FileOpsProvider, useFileOps] = makeStore();

export { FileOpsProvider, useFileOps };
