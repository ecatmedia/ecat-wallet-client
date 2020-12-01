import React from 'react';
import { withTitle } from '../../common/dynamicTitle';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import Footer from '../PageSections/Footer';
import ResponsiveContainer from '../PageSections/ResponsiveContainer';

const TermsLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Terms of Service
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          The use of services provided by Soundchain (hereafter referred to as "Ecat.media ", “Ecat”, “us”,”we”) is subject to the
          following Terms and Conditions.
          <br />
          <br />
          <u>
            <b>Important Notice:</b>
          </u>
          <br />
          Terms of Service violations: ecatmedia@protonmail.com (customers will be copied on all reports) Other Legal and Law
          Enforcement Inquiries: ecat.media.group@gmail.com
          <br />
          <br />
          <u>
            <b>Beta Software:</b>
          </u>
          <br />
          Ecat.media is beta software. Using Ecat can result in a loss of funds if files are not uploaded correctly. Ecat.media is
          not responsible if funds are lost. Please use Ecat.media with small amounts and file sizes before uploading larger ones.
          We have put in a mechanism to resume files from where the upload left off if parts of a file are not uploaded correctly
          to prevent a loss of funds.
          <br />
          <br />
          <u>
            <b>Private Keys and Wallet:</b>
          </u>
          <br />
          <b>Charging Wallet</b> - The charging wallet is a browser-based wallet that stores your private key in your cache while
          using the application. If you clear your cache for any reason you will lose your private key. Please make sure you
          back-up your keys before sending any funds to the charging wallet. The Charging Wallet is also beta software. It is only
          meant for one purpose: to upload files to the Bitcoin SV blockchain. This wallet is not meant to be used for payments.
          Failure to back-up keys resulting in a loss of funds is not the responsibility of Ecat. Cyber attackers stealing funds
          is also not the responsibility of Ecat.
          <br />
          <br />
          <u>
            <b>Information we collect to create a better user experience:</b>
          </u>
          <br />
          <b>Usernames, Password Hash:</b> We collect this for user identification, authorization and communication with our
          users.
          <br />
          <b>Email:</b> We collect this for communicating with our users.
          <br />
          <b>File Hash:</b> We collect file hash in order to bring users the resume function when uploading and to enable the
          tokenization feature for each file. It also gives user proof of upload and file management features.
          <br />
          <b>Wallet Address:</b> We collect wallet addresses to track user profiles, for micro-transactions and tokenization.
          <br />
          <b>Service Key:</b> We collect service key to serve content and monetization on files. If you don’t agree with
          Ecat.media collecting the information laid out above please don’t use our service.
          <br />
          <br />
          <u>
            <b>ILLEGAL CONTENT: </b>
          </u>
          <br />
          When you add files to the blockchain it will persist forever with your signature for as long as it exists. Although the
          content is encrypted people viewing the content can still report a user serving illegal content. Ecat.media does not
          encourage or condone uploading illegal content of any type using our service. Ecat.media will remove illegal content
          from our consumer-facing apps if we are made aware of said contents existence. Ecat.media is to be used within the laws
          governing your jurisdiction. If you are planning to upload illegal content using Ecat.media please don’t use our
          service.
          <br />
          <br />
          <b>If you don’t agree with any of our Terms of Service please don’t use Ecat.media</b>
        </p>
      </Container>
    </Segment>
    <Footer />
  </ResponsiveContainer>
);

const TermsContainer = () => {
  return (
    <ErrorBoundary componentName="TermsContainer">
      <TermsLayout />
    </ErrorBoundary>
  );
};

export default withTitle({ component: TermsContainer, title: 'Terms and conditions' });
