import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import Upload from './Upload';
import { withTitle } from '../../common/dynamicTitle';

const UploadContainer = () => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName="UploadContainer">
      <Upload />
    </ErrorBoundary>
  );
};

export default withTitle({ component: UploadContainer, title: 'Upload File' });
