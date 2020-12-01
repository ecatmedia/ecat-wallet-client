import React from 'react';
import HomeContainer from '../pages/Home/HomeContainer';
import WalletContainer from '../pages/Wallet/WalletContainer';
import UploadContainer from '../pages/Upload/UploadContainer';
import LoginContainer from '../pages/Login/LoginContainer';
import RegisterContainer from '../pages/Register/RegisterContainer';
import ProfileContainer from '../pages/Profile/ProfileContainer';
import LogoutContainer from '../pages/Logout/LogoutContainer';
import FileDetailsContainer from '../pages/FileDetails/FileDetailsContainer';
import AboutContainer from '../pages/Utils/About';
import ContcatContainer from '../pages/Utils/Contact';
import TermsContainer from '../pages/Utils/Terms';
import PrivacyContainer from '../pages/Utils/Privacy';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <HomeContainer />,
    text: 'Home',
    private: false,
  },
  {
    path: '/about',
    exact: true,
    main: () => <AboutContainer />,
    text: 'About us',
    private: false,
  },
  {
    path: '/contact',
    exact: true,
    main: () => <ContcatContainer />,
    text: 'Contact us',
    private: false,
  },
  {
    path: '/terms',
    exact: true,
    main: () => <TermsContainer />,
    text: 'Terms and Conditions',
    private: false,
  },
  {
    path: '/privacy-policy',
    exact: true,
    main: () => <PrivacyContainer />,
    text: 'Privacy Policy',
    private: false,
  },
  {
    path: '/wallet',
    // exact: true,
    main: auth => <WalletContainer {...auth} />,
    text: 'Wallet',
    private: true,
  },
  {
    path: '/upload',
    main: auth => <UploadContainer {...auth} />,
    text: 'Upload',
    private: true,
  },
  {
    path: '/login',
    main: auth => <LoginContainer {...auth} />,
    text: 'Login',
    private: false,
  },
  {
    path: '/register',
    main: () => <RegisterContainer />,
    text: 'Register',
    private: false,
  },
  {
    path: '/profile',
    main: auth => <ProfileContainer {...auth} />,
    text: 'Profile',
    private: true,
  },
  {
    path: '/files/:id',
    main: () => <FileDetailsContainer />,
    text: 'File Details',
    private: true,
  },
  {
    path: '/logout',
    main: auth => <LogoutContainer {...auth} />,
    text: 'Logout',
    private: false,
  },
];

export default routes;
