import React, { useState, useContext, useEffect } from 'react';

import api from '../common/api';

function makeStore() {
  // Make a context for the store
  const context = React.createContext();

  // Make a provider that takes an initialValue
  const Provider = ({ initialValue = {}, children }) => {
    const [authnCheckLoading, setAuthnCheckLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const [logoutLoading, setLogoutLoading] = useState(false);
    const [logoutError, setLogoutError] = useState('');

    const [user, setUser] = useState(() => {});

    const [modalsConfig, setModalsConfig] = useState(() => ({
      showSecondModal: -1,
    }));

    const loginUser = async (email, password) => {
      setLoginLoading(true);
      const resp = await api.loginUser(email, password);
      if (resp.status === 200) {
        setIsAuthenticated(true);
        setUser(resp.data);
      } else {
        setLoginError(resp.data.message);
      }
      setLoginLoading(false);
    };

    const logoutUser = async () => {
      setLogoutLoading(true);
      const resp = await api.logoutUser();
      if (resp.status === 200) {
        setIsAuthenticated(false);
        setUser({});
      } else {
        setLogoutError(resp.data.message);
      }
      setLogoutLoading(false);
    };

    useEffect(() => {
      async function checkAuthn() {
        setAuthnCheckLoading(true);
        const resp = await api.checkProtected();
        if (resp && resp.status === 200) {
          setIsAuthenticated(true);
        }
        setAuthnCheckLoading(false);
      }
      checkAuthn();
    }, []);

    return (
      <context.Provider
        value={{
          user,
          authnCheckLoading,
          loginLoading,
          loginError,
          logoutLoading,
          logoutError,
          isAuthenticated,
          loginUser,
          logoutUser,
          modalsConfig,
          setModalsConfig,
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

const [StoreProvider, useStore] = makeStore();

export { StoreProvider, useStore };
