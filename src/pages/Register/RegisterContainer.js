import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import Register from './Register'
import {withTitle} from '../../common/dynamicTitle'

const RegisterContainer = () => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName='RegisterContainer'>
      <Register />
    </ErrorBoundary>
  );
};

export default withTitle({component: RegisterContainer, title: 'Register'});
