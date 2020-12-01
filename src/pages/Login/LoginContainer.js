import React from 'react';
import {Redirect} from 'react-router'
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import Login from './Login'
import { withTitle } from '../../common/dynamicTitle'

const LoginContainer = (auth) => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName='LoginContainer'>
      {auth.userInfo ? 
        <Redirect to={'/profile'} />
      :
        <Login refresh={auth.refreshAuth} />
      }
    </ErrorBoundary>
  );
};

export default withTitle({component: LoginContainer, title: 'Login'});
