import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="About" />
            <List link inverted>
              <List.Item as={Link} to={'/contact'}>
                Contact Us
              </List.Item>
              <List.Item as={Link} to={'/terms'}>
                Terms and Conditions
              </List.Item>
              <List.Item as={Link} to={'/privacy-policy'}>
                Privacy Policy
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Services" />
            <List link inverted>
              <List.Item as="a">FAQ</List.Item>
              <List.Item as="a">Usage Manual</List.Item>
              <List.Item as="a">API Documentation</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              ecat.media
            </Header>
            <p>Immutable Encrypted File Storage Solution</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
