import React from 'react';
import { withTitle } from '../../common/dynamicTitle';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import Footer from '../PageSections/Footer';
import ResponsiveContainer from '../PageSections/ResponsiveContainer';

const PrivacyLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Privacy Policy
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          <u>
            <b>PRIVACY:</b>
          </u>
          <br />
          Ecat.media platform encrypts your digital-content using the RSA key. Amongst the services provided by the ecat.media
          platform you can choose to publish your content via our platform; in the case that you choose to do so, will keep a copy
          of the said RSA key to facilitate such service. We also record the hash of the file containing your data. After the
          publishing of your content, it will only be available after minting tokens to access the said content and the content
          creator is the only party that has the power to mint tokens. Combining the above methods, you have the power to securely
          publish and monetize your content. To ensure better user experience, Ecat.media platform uses cookies. All the
          information collected from users will be used to improve the user experience and we do not collect additional
          information from our users.
          <br />
          <br />
        </p>
      </Container>
    </Segment>
    <Footer />
  </ResponsiveContainer>
);

const PrivacyContainer = () => {
  return (
    <ErrorBoundary componentName="PrivacyContainer">
      <PrivacyLayout />
    </ErrorBoundary>
  );
};

export default withTitle({ component: PrivacyContainer, title: 'Privacy policy' });
