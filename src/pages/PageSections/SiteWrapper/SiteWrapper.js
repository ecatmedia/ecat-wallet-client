//

import * as React from "react";
import {NavLink, withRouter} from "react-router-dom";

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider
} from "tabler-react";
import {useStore} from '../../../store';

// import 'bootstrap/dist/css/bootstrap.min.css';


const navBarItems = [
  {
    value: "Home",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true
  }, {
    value: "Wallet",
    to: "/wallet",
    icon: "check-square",
    LinkComponent: withRouter(NavLink)
  }, {
    value: "Upload",
    to: "/upload",
    icon: "image",
    LinkComponent: withRouter(NavLink)
  }, {
    value: "Login",
    to: "/login",
    icon: "image",
    LinkComponent: withRouter(NavLink)
  }, {
    value: "Register",
    to: "/register",
    icon: "image",
    LinkComponent: withRouter(NavLink)
  }, {
    value: "Profile",
    to: "/profile",
    icon: "image",
    LinkComponent: withRouter(NavLink)
  }, {
    value: "Logout",
    to: "/logout",
    icon: "image",
    LinkComponent: withRouter(NavLink)
  }
];

const SiteWrapper = ({children}) => {
  const {state} = useStore()

  return (
    <Site.Wrapper
      headerProps={{
        href: "/",
        alt: "ECAT 0.0",
        imageURL: "./demo/brand/tabler.svg",
        navItems: (
          <Nav.Item type="div" className="d-none d-md-flex">
            <Button
              href="https://ecat.media"
              target="_blank"
              outline
              size="sm"
              RootComponent="a"
              color="primary">
              Github
            </Button>
          </Nav.Item>
        ),
      }}
      navProps={{
        itemsObjects: navBarItems.filter(item => {
          if (state.isAuthenticated) {
            if (item.to === '/register' || item.to === '/login') {
              return false
            }
          }
          return true;
        })
      }}
      routerContextComponentType={withRouter(RouterContextProvider)}
      footerProps={{
        links: [
          <a href="https://twitter.com/ecat.media"> Twitter </a>,
          <a href="https://github.com/ecat.media">Github</a>,
          <a href = "mailto:hi@ecat.media" > hi@ecat.media </a>,
        ],
        note: "Immutable Encrypted media publishing platform",
        copyright: (
          <React.Fragment>
            Copyright © 2019
            <a href=".">
              ECAT</a>.
            All rights reserved.
          </React.Fragment>
        ),
        nav: (
          <React.Fragment>
          </React.Fragment>
        ),
      }}
    >
      {children}
    </Site.Wrapper>
  );
}

export default SiteWrapper;