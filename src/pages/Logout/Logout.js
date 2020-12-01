import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import { useStore } from '../../store';

const Logout = auth => {
  const { isAuthenticated, logoutUser } = useStore();

  useEffect(() => {
    async function logout() {
      await logoutUser();
    }
    logout();
  }, [auth.userInfo]);

  if (!isAuthenticated) {
    return <Redirect to={'/login'} />;
  }

  return (
    <ErrorBoundary componentName="Logout">
      <LogoutStyled></LogoutStyled>
    </ErrorBoundary>
  );
};

const LogoutStyled = styled.div`
  .Logout {
  }
`;

export default Logout;
