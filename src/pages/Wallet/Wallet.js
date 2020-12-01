import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Grid,
  Table,
  Header,
  Divider,
  Segment,
  Container,
  Form,
  Pagination,
  Modal,
  Icon,
  Input,
  Message,
  Dropdown,
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import MoneyButton from '@moneybutton/react-money-button';
import { StyleSheet, css } from 'aphrodite';

import { useBSV } from '../../store/bsvContext';
import { constructMoneyButtonTransaction, constructTransactionForUtxoRecycling } from '../../lib/transaction';
import { satchel } from '../../lib/satchel';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import FileButton from '../../common/fileInput';
import PageWrapper from '../PageSections/PageWrapper';

import ControlSegment from './ControlSegment';

const MoneyButtonWrapper = ({ outputs }) => {
  if (!outputs || !outputs.length) return '';
  return (
    <Segment>
      <h4>{'Pay with MoneyButton'}</h4>
      <MoneyButton outputs={outputs} />
    </Segment>
  );
};

const MemoizedMoneyButton = React.memo(MoneyButtonWrapper);

const RestoreWalletModal = ({ isOpen, loginLoading, loginError, onClose, userInput, onInputChange, onRestore, onFileSelect }) => (
  <Modal basic open={isOpen}>
    <Header icon="archive" content="Restore Wallet" />
    <Modal.Content>
      {loginLoading ? 'Please wait until your wallet is restored ...' : null}
      {loginError ? loginError : null}
      <p>Enter your mnemonic/xpriv or select your backup key: </p>
      <Input style={{ width: '100%' }} value={userInput} onChange={onInputChange} placeholder="xpriv or mnemonic" key="iiii" />
      <br />
      <FileButton onSelect={onFileSelect} />
    </Modal.Content>
    <Modal.Actions>
      <Button style={{ float: 'left' }} basic color={'red'} variant="secondary" onClick={onClose}>
        <Icon name="remove" /> Close
      </Button>
      <Button disabled={loginLoading} variant="primary" inverted onClick={onRestore}>
        Restore
      </Button>
    </Modal.Actions>
  </Modal>
);

const Wallet = () => {
  const {
    utxos,
    satchelKeyXPriv,
    satchelKeyMnemonic,
    satchelKeyFixedAddress,
    loadingStates,
    errorStates,
    satchelNewWallet,
    satchelRestoreWallet,
    satchelRestoreBackup,
    isLoggedIn,
    setUpdateLock,
    ownerRSASecretKey,
    satchelGenerateRSAKey,
    satchelLogout,
  } = useBSV();
  const [userInputXprivOrMnemonic, setUserInputXprivOrMnemonic] = useState(() => '');
  const [userInputBackupKey, setUserInputBackupKey] = useState(() => undefined);
  const [userInputRSAPassphrase, setUserInputRSAPassphrase] = useState(() => '');

  const [megabytes, setMegabytes] = useState();
  const [moneyButtonMessage, setMoneyButtonMessage] = useState(() => '');
  const [moneyButton, setMoneyButton] = useState();
  const [utxosActivePage, setUtxosActivePage] = useState(1);
  const utxosPerPage = 12;

  const [modalsConfig, setModalsConfig] = useState(() => ({
    privateInfo: false,
    logoutConfirm: false,
    restoreWallet: false,
    newWallet: false,
    generateRSA: false,
  }));

  const [showRecycleModal, setShowRecycleModal] = useState(() => false);
  const [recycleUTXOStatus, setRecycleUTXOStatus] = useState(() => ({
    broadcastMessage: '',
    processMessage: '',
    isCloseDisabled: false,
  }));

  const [showGuideModal, setShowGuideModalState] = useState(() => !!!localStorage.getItem('showGuideModal'));

  useEffect(() => {
    setUpdateLock(false);
  }, []);

  const setShowGuideModal = (val) => {
    localStorage.setItem('showGuideModal', val);
    setShowGuideModalState(false);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const _initNewWallet = async () => {
    await satchelNewWallet();
    setModalsConfig((prev) => ({
      ...prev,
      newWallet: false,
    }));
  };

  const _restoreWallet = async () => {
    if (userInputBackupKey) {
      await satchelRestoreBackup(userInputBackupKey);
    } else {
      await satchelRestoreWallet(userInputXprivOrMnemonic);
    }
  };

  const _startGeneratingRSAKey = async () => {
    await satchelGenerateRSAKey(userInputRSAPassphrase);
    setModalsConfig((prev) => ({
      ...prev,
      generateRSA: false,
    }));
  };

  const logoutCurrentWallet = async () => {
    satchelLogout();
    await sleep(10);
    window.location.reload();
  };

  function createMoneyButton() {
    if (!isLoggedIn()) {
      setMoneyButtonMessage('You are not logged in yet!');
      return false;
    }
    const outputs = constructMoneyButtonTransaction(megabytes, satchelKeyFixedAddress);
    setMoneyButton({
      outputs,
    });
  }

  const recycleUnspentTransactions = async () => {
    setUpdateLock(true);
    setRecycleUTXOStatus((prev) => ({
      ...prev,
      processMessage: 'Creating transaction ...',
      isCloseDisabled: true,
    }));
    const tx = constructTransactionForUtxoRecycling(utxos);
    setRecycleUTXOStatus({
      broadcastMessage: 'Starting to broadcast ...',
      processMessage: 'You are going to have ' + (tx.outputs.length - 1).toString() + ' good utxos.',
    });

    try {
      await satchel.broadcastTx(tx);
      setRecycleUTXOStatus((prev) => ({
        ...prev,
        broadcastMessage: 'Transaction broadcasted successfuly.',
        isCloseDisabled: false,
      }));
    } catch (e) {
      setRecycleUTXOStatus((prev) => ({
        ...prev,
        broadcastMessage: 'We got an error while broadcasting transaction.',
        isCloseDisabled: false,
      }));
    }
    setUpdateLock(false);
  };

  const renderUtxos = () => {
    return (
      <>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Value</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Confirmations</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {utxos &&
              utxos.slice((utxosActivePage - 1) * utxosPerPage, utxosActivePage * utxosPerPage).map((utxo) => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h2" textAlign="center">
                        {utxo.value}
                      </Header>
                    </Table.Cell>
                    <Table.Cell singleLine>{utxo.address}</Table.Cell>
                    <Table.Cell>{utxo.confirmations}</Table.Cell>
                  </Table.Row>
                );
              })}
            {/* <Table.Row className={css(styles.showMoreButton)}>
              <div style={{ marginTop: '15px' }}>Show More ...</div>
            </Table.Row> */}
          </Table.Body>
        </Table>
        <Container textAlign="center" style={{ marginTop: '20px' }}>
          <Pagination
            defaultActivePage={utxosActivePage}
            totalPages={Math.ceil(utxos.length / utxosPerPage)}
            onPageChange={(e, d) => setUtxosActivePage(d.activePage)}
          />
        </Container>
      </>
    );
  };

  const PrivateInfoModal = () => (
    <Modal basic open={modalsConfig.privateInfo}>
      <Header icon="archive" content="Your secrets" />
      <Modal.Content>
        <p>{'Mnemonic words: '}</p>
        <ReactMarkdown source={satchelKeyMnemonic} escapeHtml={false} />
        <p>{'XPRIV: '}</p>
        <ReactMarkdown source={satchelKeyXPriv} escapeHtml={false} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          style={{ float: 'left' }}
          basic
          color={'red'}
          inverted
          variant="secondary"
          onClick={() => setModalsConfig({ ...modalsConfig, privateInfo: false })}
        >
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const LogoutConfirmModal = () => (
    <Modal basic open={modalsConfig.logoutConfirm}>
      <Header icon="archive" content="Logout wallet" />
      <Modal.Content>
        <p>{'Are you sure that you want to logout from this wallet?'}</p>
        <p>{'Make sure you have backed up your funds properly.'}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button variant="danger" onClick={() => logoutCurrentWallet()}>
          <Icon name="logout" /> Logout
        </Button>
        <Button
          style={{ float: 'left' }}
          basic
          color={'red'}
          inverted
          variant="secondary"
          onClick={() => setModalsConfig({ ...modalsConfig, logoutConfirm: false })}
        >
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const RecycleModal = () => (
    <Modal basic open={showRecycleModal}>
      <Header icon="recycle" content="Recycle UTXOs" />
      <Modal.Content>
        <p>{recycleUTXOStatus.processMessage}</p>
        <p>{recycleUTXOStatus.broadcastMessage}</p>
        <p>
          {
            'You are going to recycle your transactions that their values are less than the amount needed to be considered as a good utxo for uploading files.'
          }
        </p>
        <p>{'After you start the recycle process, you should wait for ~10 minutes for your utxos to get confirmed.'}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button variant="danger" onClick={() => recycleUnspentTransactions()}>
          <Icon name="recycle" /> Recycle
        </Button>
        <Button
          style={{ float: 'left' }}
          basic
          color={'red'}
          inverted
          variant="secondary"
          onClick={() => setShowRecycleModal(false)}
          disabled={recycleUTXOStatus.isCloseDisabled}
        >
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const GuideModal = () => (
    <Modal basic open={showGuideModal}>
      <Header icon="archive" content="Welcome!" />
      <Modal.Content>
        <p>Hi, </p>
        <p style={{ fontSize: '20px' }}>
          This is your wallet page. You can manage your funds, your unspent transactions and more. If you have not already
          connected your wallet, you can click `Restore new wallet` and restore your own wallet here.
          <p>Or If you want to create a new wallet, click `Generate new wallet` to generate a new HD wallet for you.</p>
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          style={{ float: 'left' }}
          basic
          color={'red'}
          inverted
          variant="secondary"
          onClick={() => setShowGuideModal('done')}
        >
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const NewWalletModal = () => (
    <Modal basic open={modalsConfig.newWallet}>
      <Header icon="archive" content="New wallet" />
      <Modal.Content>
        {loadingStates.login ? 'Please wait until your wallet is generated ...' : null}
        <p>{errorStates.login ? errorStates.login : null}</p>
        <p>Click `Start` to start generating a new HD wallet for you.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          style={{ float: 'left' }}
          basic
          color={'red'}
          inverted
          variant="secondary"
          onClick={() => setModalsConfig({ ...modalsConfig, newWallet: false })}
        >
          <Icon name="remove" /> Close
        </Button>
        <Button disabled={loadingStates.login} variant="primary" onClick={() => _initNewWallet()}>
          Start
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const GenerateRSAKeyModal = () => (
    <Modal basic open={modalsConfig.generateRSA}>
      <Header icon="archive" content="Restore Wallet" />
      <Modal.Content>
        {loadingStates.rsaGenerate ? 'Please wait until your wallet is restored ...' : null}
        {errorStates.rsaGenerate ? errorStates.rsaGenerate : null}
        <p>Enter your passphrase: </p>
        <Input
          style={{ width: '100%' }}
          value={userInputRSAPassphrase}
          onChange={(e) => setUserInputRSAPassphrase(e.target.value)}
          placeholder="passphrase"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          style={{ float: 'left' }}
          basic
          color={'red'}
          variant="secondary"
          onClick={() => setModalsConfig((prev) => ({ ...prev, generateRSA: false }))}
        >
          <Icon name="remove" /> Close
        </Button>
        <Button disabled={loadingStates.rsaGenerate} variant="primary" inverted onClick={() => _startGeneratingRSAKey()}>
          Restore
        </Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <ErrorBoundary componentName="Wallet">
      <PageWrapper>
        <PrivateInfoModal />
        <LogoutConfirmModal />
        <RecycleModal />
        <GuideModal />
        <NewWalletModal />
        <RestoreWalletModal
          isOpen={modalsConfig.restoreWallet}
          onClose={() => setModalsConfig((prev) => ({ ...prev, restoreWallet: false }))}
          loginLoading={loadingStates.login}
          loginError={errorStates.login}
          userInput={userInputXprivOrMnemonic}
          onInputChange={(e) => setUserInputXprivOrMnemonic(e.target.value)}
          onRestore={() => _restoreWallet()}
          onFileSelect={setUserInputBackupKey}
        />
        <GenerateRSAKeyModal />
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              {!ownerRSASecretKey ? (
                <Message warning>
                  <Message.Header>Your RSA key is not generated yet!</Message.Header>
                  <p style={{ cursor: 'pointer' }} onClick={satchelGenerateRSAKey}>
                    Click here to start generating your RSA key pair.
                  </p>
                </Message>
              ) : null}
            </Grid.Column>
            <Grid.Column width={8} mobile={16} largeScreen={8} computer={8} tablet={8}>
              <ControlSegment modalsConfig={modalsConfig} setModalsConfig={setModalsConfig} />
            </Grid.Column>

            <Grid.Column width={8} mobile={16} largeScreen={8} computer={8} tablet={8}>
              <Segment.Group>
                <Segment>
                  <h2>Charge your wallet</h2>
                  <Form size={'big'}>
                    <Form.Group widths="equal">
                      <Form.Field
                        label="Size (Mega bytes)"
                        control="input"
                        placeholder="size"
                        onChange={(e) => setMegabytes(e.target.value)}
                      />
                    </Form.Group>
                    <Button type="submit" disabled={!megabytes} onClick={() => createMoneyButton()}>
                      Submit
                    </Button>
                    <Divider hidden />
                  </Form>
                </Segment>
                {moneyButtonMessage !== '' ? <p>{moneyButtonMessage}</p> : null}
                <MemoizedMoneyButton outputs={moneyButton ? moneyButton.outputs : []} />
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {utxos && utxos.filter((utxo) => !(utxo.confirmations > 0)).length ? (
                <Message warning>
                  <Message.Header>You have unconfirmed utxos!</Message.Header>
                  <p>You should wait until your utxos get at least 1 confirmation.</p>
                </Message>
              ) : null}
              <div>
                <h2 style={{ display: 'inline-block' }}>{'Unspent Transaction outputs'}</h2>
                <Dropdown icon="cog" style={{ display: 'inline-block', marginLeft: '20px' }}>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowRecycleModal(true)} icon="recycle" text="Recycle" />
                    <Dropdown.Item icon="refresh" text="Refresh" />
                    <Dropdown.Item icon="trash" text="Clean dust" />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {renderUtxos()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </PageWrapper>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  showMoreButton: {
    backgroundImage: 'linear-gradient(transparent, white 50%)',
    position: 'absolute',
    bottom: '150px',
    height: '80px',
    width: '98%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withRouter(Wallet);
