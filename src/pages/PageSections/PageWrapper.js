import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Modal, TextArea, Icon, Button, Grid, Header, Image, List, Menu, Segment, Message } from 'semantic-ui-react';

import api from '../../common/api';
import BitcoinStatusBar from './BitcoinStatusBar';
import BackupNotice from './BackupNotice';
import Footer from './Footer';
import { useBSV } from '../../store/bsvContext';

const cryptico = require('cryptico');

const FixedMenuLayout = ({ children, history }) => {
  const [showReportModal, setShowReportModal] = useState(() => false);
  const [issueDescription, setIssueDescription] = useState(() => '');
  const { ownerRSAKey, setOwnerRSAKey, isRSAKeyLoading, setIsRSAKeyLoading, ownerPrivateKey } = useBSV();
  const [reportStatus, setReportStatus] = useState(() => ({
    isLoading: false,
    error: '',
  }));

  const submitReportIssue = async () => {
    setReportStatus(prev => ({
      ...prev,
      isLoading: true,
    }));
    const res = await api.submitIssueReport(issueDescription, history.location.pathName);
    if (res.status === 200) {
      setReportStatus(prev => ({
        ...prev,
        isLoading: false,
      }));
      setShowReportModal(false);
    } else {
      setReportStatus({
        isLoading: false,
        error: res.data.toString(),
      });
    }
  };

  const getMenuStyles = () => {
    if (!ownerRSAKey) {
      return {
        top: 'unset',
        margin: 'unset',
        borderRadius: 'unset',
      };
    }
    return {
      margin: 'unset',
      borderRadius: 'unset',
    };
  };

  const generateRSAKey = e => {
    e.preventDefault();
    setIsRSAKeyLoading(true);
    const rsaKey = JSON.stringify(cryptico.generateRSAKey(ownerPrivateKey, 2048).toJSON());
    setOwnerRSAKey(rsaKey);
    setIsRSAKeyLoading(false);
  };

  return (
    <div>
      {ownerRSAKey ? (
        <Message
          style={{
            margin: 'unset',
            borderRadius: 'unset',
          }}
          icon={isRSAKeyLoading ? <Icon name="circle notched" loading /> : 'inbox'}
          color="yellow"
          header="You private key has not been generated yet!"
          content={
            <p onClick={generateRSAKey}>
              <a href="#generate">Cilck here to generate your private key.</a>
            </p>
          }
        />
      ) : null}

      <BitcoinStatusBar />
      <BackupNotice />

      <Menu inverted style={getMenuStyles()}>
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src="/inverted.png" />
            ecat
          </Menu.Item>
          <Menu.Item as={Link} to={'/'}>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to={'/wallet'}>
            Wallet
          </Menu.Item>
          <Menu.Item as={Link} to={'/upload'}>
            Upload
          </Menu.Item>
          <Menu.Item as={Link} to={'/profile'}>
            Profile
          </Menu.Item>
          <Menu.Item as={Link} to={'/logout'}>
            Logout
          </Menu.Item>
          <Menu.Item onClick={() => setShowReportModal(true)}>Report Issue</Menu.Item>
        </Container>
      </Menu>

      <Modal basic open={showReportModal}>
        <Header icon="archive" content="Report an issue" />
        <Modal.Content>
          {reportStatus.isLoading ? 'Submitting your report ...' : null}
          {reportStatus.error ? <p>{reportStatus.error}</p> : null}
          <p>Please explain what happend and we will try to fix it or send you an explanation in return.</p>
          <TextArea
            style={{ width: '100%' }}
            value={issueDescription}
            onChange={e => setIssueDescription(e.target.value)}
            placeholder="Description"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            style={{ float: 'left' }}
            basic
            color={'red'}
            inverted
            variant="secondary"
            onClick={() => setShowReportModal(false)}
          >
            <Icon name="remove" /> Close
          </Button>
          <Button disabled={reportStatus.isLoading} variant="primary" onClick={() => submitReportIssue()}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>

      <Container style={{ marginTop: '7em', minHeight: 'calc(90vh - 40px)' }}>{children}</Container>

      <Footer />
    </div>
  );
};

export default withRouter(FixedMenuLayout);
