import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthWrapper = props => {
  if (props.isLoading) {
    return 'Loading ...';
  }
  if (!props.isAuthenticated && !props.isLoading) {
    return <Redirect to={'/login'} />;
  }
  return props.target;
};

export default AuthWrapper;
