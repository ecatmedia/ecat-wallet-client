import React from 'react';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import Footer from '../PageSections/Footer';
import ResponsiveContainer from '../PageSections/ResponsiveContainer';

const HomepageLayout = () => (
  <ResponsiveContainer activeTab={'home'}>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Change how you secure and publish files
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              The e-cat protocol combines cryptographic methods to put all types of data on the blockchain. The data is encrypted
              in a way where only parties with pre-defined authorizations will be able to decrypt and concatenate the data from
              the blockchain. The protocol also offers a feature of sharing the encrypted data and defining new access rules,
              without the need to upload, decrypt/re-encrypt the file again.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image rounded size="large" src="/ecat_text.jpg" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Learn more</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Serverless Cloud
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          On Bitcoin, miners store your data for a one time transaction fee depending on the size of a file. e-cat allows users to
          create encrypted files that are immutable and accessible from anywhere at anytime. Our file management system makes
          organizing files as simple as a traditional cloud service.
        </p>

        <Header as="h3" style={{ fontSize: '2em' }}>
          Publishing
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          e-cat allows artists and content creators to publish their work and tokenize access to their work. This allows them to
          manage what type of access they grant to their consumers. Pay per stream, download, give one time access to a file and
          many more access types are possible. It also prevents any unauthorized access to the file content.
        </p>
        <Divider as="h4" className="header" horizontal style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
          <a href="#buidl">BUIDL</a>
        </Divider>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Applications
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          ecat.media allows developers to use our API and build their applications on top of ecat. You can build an app that
          streams music or publishes books while using e-cat as a backing service. The possibilities of applications and their
          monetization using e-cat are endless!
        </p>
        <Button as="a" size="large" disabled>
          Start using API
        </Button>
      </Container>
    </Segment>

    <Footer />
  </ResponsiveContainer>
);
export default HomepageLayout;
