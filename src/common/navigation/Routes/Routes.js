import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../../../config/routes';
import { generateUuid } from '../../util';
import NoMatch from './NoMatch';
import PrivateRoute from '../../navigation/PrivateRoute';
import { useStore } from '../../../store';

const Routes = () => {
  const { authnCheckLoading, isAuthenticated } = useStore();
  return (
    <Switch>
      {routes.map(route => {
        if (route.private) {
          return (
            <PrivateRoute
              key={generateUuid()}
              path={route.path}
              exact={route.exact}
              component={() => route.main()}
              authenticated={isAuthenticated}
              loading={authnCheckLoading}
            />
          );
        }
        return <Route key={generateUuid()} path={route.path} exact={route.exact} component={() => route.main()} />;
      })}
      <Route component={NoMatch} />
    </Switch>
  );
};

export default Routes;
