import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import Home from './Home'
import {withTitle} from '../../common/dynamicTitle'

const HomeContainer = () => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName='HomeContainer'>
      <Home />
    </ErrorBoundary>
  );
};

export default withTitle({component: HomeContainer, title: 'Home'});
