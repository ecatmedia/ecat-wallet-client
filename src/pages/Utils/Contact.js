import React from 'react';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { withTitle } from '../../common/dynamicTitle';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import ResponsiveContainer from '../PageSections/ResponsiveContainer';
import Footer from '../PageSections/Footer';

const ContactLayout = () => (
  <ResponsiveContainer activeTab={'contact'}>
    <Segment style={{ padding: '8em 0em', minHeight: '700px' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Contact us
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          <a href="mailto:ecat.media@protonmail.com">ecat.media@protonmail.com</a>
          <br />
          <a href="https://twitter.com/ecatdotmedia">@ecatdotmedia</a>
        </p>
      </Container>
    </Segment>
    <Footer />
  </ResponsiveContainer>
);

const ContactContainer = () => {
  return (
    <ErrorBoundary componentName="ContactContainer">
      <ContactLayout />
    </ErrorBoundary>
  );
};

export default withTitle({ component: ContactContainer, title: 'Contact us' });
