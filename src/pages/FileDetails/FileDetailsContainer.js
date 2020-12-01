import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import FileDetails from './FileDetails';
import { withTitle } from '../../common/dynamicTitle';
import { FileOpsProvider } from '../../store/fileOpsContext';

const FileDetailsContainer = () => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName="FileDetailsContainer">
      <FileOpsProvider>
        <FileDetails />
      </FileOpsProvider>
    </ErrorBoundary>
  );
};

export default withTitle({ component: FileDetailsContainer, title: 'Manage Tokens' });
