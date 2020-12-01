import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import { useStore } from '../../store';
import LoadingScreen from '../../common/fullpageLoader';

const Login = ({ location }) => {
  const { loginUser, isAuthenticated, loginLoading, loginError, authnCheckLoading } = useStore();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const onChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    loginUser(email, password);
  };

  if (authnCheckLoading) {
    return <LoadingScreen loading={true} />;
  }

  if (isAuthenticated) {
    if (location.state && location.state.from) return <Redirect to={location.state.from.pathname} />;
    return <Redirect to={'/profile'} />;
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Login
        </Header>
        {loginError ? (
          <Message negative>
            <Message.Header>Oh no! :(</Message.Header>
            {loginError}
          </Message>
        ) : null}
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              value={email}
              onChange={onChange}
              name="email"
              iconPosition="left"
              placeholder="Username"
            />
            <Form.Input
              fluid
              icon="lock"
              value={password}
              onChange={onChange}
              name="password"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button onClick={onSubmit} color="teal" fluid loading={loginLoading} size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/register">Sign Up</a>
        </Message>
        {/* <Message>
          Forgot your password? <a href="/reset">Reset password</a>
        </Message> */}
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(Login);
