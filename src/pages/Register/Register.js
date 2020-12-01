import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import LoadingScreen from '../../common/fullpageLoader';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useStore } from '../../store';
import urls from '../../config/urls';

const Register = () => {
  const { authCheckLoading, isAuthenticated } = useStore();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invite, setInvite] = useState();
  const [errors, setErrors] = useState({});
  const [registerLoading, setRegisterLoading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const onChange = e => {
    switch (e.target.name) {
      case 'invite':
        setInvite(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setRegisterLoading(true);
    let res = undefined;
    try {
      res = await axios({
        url: urls.auth.register(),
        method: 'POST',
        data: {
          username: email,
          password,
          invite,
        },
      });
    } catch (e) {
      console.log(e);
      res = e.response;
    }
    setRegisterLoading(false);
    if (res.status === 200) {
      setRedirectToLogin(true);
    } else {
      setErrors(res.data.errors);
    }
  };

  if (authCheckLoading) {
    return <LoadingScreen loading={true} />;
  }

  if (isAuthenticated) {
    return <Redirect to={'/profile'} />;
  }

  if (redirectToLogin) {
    return <Redirect to={'/login'} />;
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Signup
        </Header>
        {Object.keys(errors).length ? (
          <Message negative>
            <Message.Header>Oh no! :(</Message.Header>
            <ul>
              {Object.keys(errors).map(k => {
                return (
                  <li>
                    {k} {':'} {errors[k]}
                  </li>
                );
              })}
            </ul>
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

            <Button loading={registerLoading} onClick={onSubmit} color="teal" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href="/login">Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
