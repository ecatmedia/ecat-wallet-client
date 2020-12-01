import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import Profile from './Profile'
import { withTitle } from '../../common/dynamicTitle'

const ProfileContainer = () => {
  // TODO: add state here
  return (
    <ErrorBoundary componentName='ProfileContainer'>
      <Profile />
    </ErrorBoundary>
  );
};

export default withTitle({component: ProfileContainer, title: 'Profile'});
