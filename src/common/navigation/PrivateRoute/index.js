import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, authenticated, loading, ...rest }) {
  // console.log(loading, authenticated, 'hihihi')
  if (loading) {
    return <Route {...rest} render={() => <Spinner animation="border" variant="warning" />} />;
  }
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
