import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import Wallet from './Wallet'
import {withTitle} from '../../common/dynamicTitle'

const WalletContainer = () => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName='WalletContainer'>
      <Wallet/>
    </ErrorBoundary>
  );
};

export default withTitle({component: WalletContainer, title: 'Wallet'});
