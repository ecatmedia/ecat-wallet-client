import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Menu, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react';
import { useStore } from '../../store';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="ecat.media"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as="h2"
      content="Encrypted & Immutable file storage solution"
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size="huge">
      Get Started Now
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, activeTab } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ padding: '1em 0em' }} vertical>
            <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
              <Container>
                <Menu.Item as={Link} to={'/'} active={activeTab === 'home'}>
                  Home
                </Menu.Item>
                <Menu.Item as={Link} to={'/about'} active={activeTab === 'about'}>
                  About
                </Menu.Item>
                <Menu.Item as={'a'} href="https://ecatmedia.github.io/">
                  Blog
                </Menu.Item>
                <Menu.Item as={Link} to={'/contact'} active={activeTab === 'contact'}>
                  Contact
                </Menu.Item>
                <Menu.Item position="right">
                  {this.props.loginLoading ? null : this.props.loggedin ? (
                    <>
                      <Button as={Link} to={'/profile'} inverted={!fixed}>
                        Profile
                      </Button>
                      <Button as={Link} to={'/logout'} inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button as={Link} to={'/login'} inverted={!fixed}>
                        Log in
                      </Button>
                      <Button as={Link} to={'/register'} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>
                    </>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
            {activeTab === 'home' ? <HomepageHeading /> : null}
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, activeTab } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar as={Menu} animation="push" inverted onHide={this.handleSidebarHide} vertical visible={sidebarOpened}>
          <Menu.Item as={Link} to={'/'} active={activeTab === 'home'}>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/about" active={activeTab === 'about'}>
            About
          </Menu.Item>
          <Menu.Item as="a" href="https://ecatmedia.github.io/">
            Blog
          </Menu.Item>
          <Menu.Item as={Link} to="/contact" active={activeTab === 'contact'}>
            Contact
          </Menu.Item>
          <Menu.Item as={Link} to={'/login'}>
            Log in
          </Menu.Item>
          <Menu.Item as={Link} to={'/register'}>
            Sign Up
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted textAlign="center" style={{ minHeight: 350, padding: '1em 0em' }} vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  {this.props.loginLoading ? null : this.props.loggedin ? (
                    <>
                      <Button as={Link} to={'/profile'}>
                        Profile
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button as={Link} to={'/login'}>
                        Log in
                      </Button>
                      <Button as={Link} to={'/register'} style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>
                    </>
                  )}
                </Menu.Item>
              </Menu>
            </Container>
            {activeTab === 'home' ? <HomepageHeading mobile /> : null}
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children, activeTab }) => {
  const { isAuthenticated, authnCheckLoading } = useStore();

  return (
    <div>
      <DesktopContainer activeTab={activeTab} loggedin={isAuthenticated} loginLoading={authnCheckLoading}>
        {children}
      </DesktopContainer>
      <MobileContainer activeTab={activeTab} loggedin={isAuthenticated} loginLoading={authnCheckLoading}>
        {children}
      </MobileContainer>
    </div>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

export default ResponsiveContainer;
