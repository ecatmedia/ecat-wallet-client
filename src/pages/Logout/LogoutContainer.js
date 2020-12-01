import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import Logout from './Logout'
import { withTitle } from '../../common/dynamicTitle'

const LogoutContainer = (auth) => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName='LogoutContainer'>
      <Logout {...auth}/>
    </ErrorBoundary>
  );
};

export default withTitle({component: LogoutContainer, title: 'Logout'});
