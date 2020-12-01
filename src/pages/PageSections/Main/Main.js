import React from 'react';
import ReactNotification from 'react-notifications-component';

import { StoreProvider } from '../../../store';
import ErrorBoundary from '../../../common/ErrorBoundary/ErrorBoundary';
import Routes from '../../../common/navigation/Routes/Routes';
import { BSVProvider } from '../../../store/bsvContext';
import { UploadProvider } from '../../../store/uploadContext';
import 'react-notifications-component/dist/theme.css';

const Main = () => (
  <ErrorBoundary componentName="Main">
    <StoreProvider>
      <BSVProvider>
        <UploadProvider>
          <ReactNotification />
          <Routes />
        </UploadProvider>
      </BSVProvider>
    </StoreProvider>
  </ErrorBoundary>
);

export default Main;
