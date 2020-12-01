import React from 'react';
import { Router } from 'react-router-dom';
import history from '../../common/navigation/history';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import PageSections from '../../pages/PageSections/PageSections';

const App = () => (
  <ErrorBoundary componentName="App">
    <Router history={history}>
      <PageSections />
    </Router>
  </ErrorBoundary>
);

export default App;
