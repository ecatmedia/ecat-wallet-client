import React from 'react';
import { withTitle } from '../../common/dynamicTitle';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import Footer from '../PageSections/Footer';
import ResponsiveContainer from '../PageSections/ResponsiveContainer';
import { css, StyleSheet } from 'aphrodite';

const AboutLayout = () => (
  <ResponsiveContainer activeTab={'about'}>
    <Segment style={{ padding: '8em 0em', minHeight: '700px' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          About us
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          We are a team of independent developers that have been involved in Bitcoin since 2013 through trading, R&D, mining etc.
          We are based out of Toronto, Canada.
        </p>
        <div className={css(styles.avatarsWrapper)}>
          <a href="https://twitter.com/CVPITVLIST" className={css(styles.avatar)}>
            <Image src="/avatars/cvpitvlist.jpg" size="small" circular />
          </a>
          <a href="https://twitter.com/fk719y" className={css(styles.avatar)}>
            <Image src="/avatars/fktlgy.png" size="small" circular />
          </a>
          <a href="https://twitter.com/fiatcrash" className={css(styles.avatar)}>
            <Image src="/avatars/nima.jpg" size="small" circular />
          </a>
        </div>
      </Container>
    </Segment>
    <Footer />
  </ResponsiveContainer>
);

const AboutContainer = () => {
  return (
    <ErrorBoundary componentName="AboutContainer">
      <AboutLayout />
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  avatar: {
    display: 'inline-block',
  },
  avatarsWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withTitle({ component: AboutContainer, title: 'About us' });
