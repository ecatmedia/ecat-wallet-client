import React, { useState, useEffect, useMemo } from 'react';
import { Segment, Table, Container, Header, Button, Modal, Dropdown, Icon, Message, Tab, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { StyleSheet, css } from 'aphrodite';
import MoneyButton from '@moneybutton/react-money-button';
import { FaBroadcastTower, FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';

import { constructECATPaymentMoneyButtonTx } from '../../lib/transaction';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import { useBSV } from '../../store/bsvContext';
import urls from '../../config/urls';
import { showNotification } from '../../common/notification';
import LoadingScreen from '../../common/fullpageLoader';
import PageWrapper from '../PageSections/PageWrapper';
import api from '../../common/api';
import { useFileOps } from '../../store/fileOpsContext';

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

const NormalTokenPane = ({ setShow, fileId }) => {
  const { normalTokenInfo, generateNormalToken, fetchFileDetails } = useFileOps();
  const daysUsageLimit = [
    { key: '10', text: '10', value: 10 },
    { key: '30', text: '30', value: 33 },
    { key: '50', text: '50', value: 50 },
    { key: '70', text: '70', value: 70 },
    { key: '100', text: '100', value: 100 },
  ];
  const [usageLimit, setUsageLimit] = useState({ key: '0', text: 'Select usage limit', value: '0' });
  return (
    <>
      <Message>
        <Message.Header>Guide</Message.Header>
        <p>
          This is a normal token. You need to select usage limit for this token. After this limit, no one will be able to access
          the file.
        </p>
      </Message>
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={daysUsageLimit}
        search
        onChange={(e, d) => {
          const selected = daysUsageLimit.filter((t) => t.value === d.value)[0];
          setUsageLimit(selected);
        }}
        text={usageLimit.text}
      />
      <Divider />
      <Button
        onClick={async () => {
          const res = await generateNormalToken();
          if (res) {
            setShow(false);
            await fetchFileDetails(fileId);
          }
        }}
        disabled={false}
      >
        <Icon name="tick" /> Generate
      </Button>
    </>
  );
};
const PaidTokenPane = () => {
  const paymentAmounts = [
    { key: '1', text: '$1', value: 1 },
    { key: '5', text: '$5', value: 5 },
    { key: '10', text: '$10', value: 10 },
  ];

  const [paymentAmount, setPaymentAmount] = useState({ key: '0', text: 'Select payment amount', value: '0' });
  const [moneybutton, setMoneybutton] = useState([]);

  useEffect(() => {
    if (paymentAmount.value === '0') return;
    const outputs = constructECATPaymentMoneyButtonTx(paymentAmount.value);
    setMoneybutton(outputs);
  }, [paymentAmount]);

  return (
    <>
      <Message>
        <Message.Header>Guide</Message.Header>
        <p>
          Choose the amount each person needs to pay for him/her to be able to access the file. After the payment is successful,
          payer will be able to access the file.
        </p>
      </Message>
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={paymentAmounts}
        search
        onChange={(e, d) => {
          const selected = paymentAmounts.filter((t) => t.value === d.value)[0];
          setPaymentAmount(selected);
        }}
        text={paymentAmount.text}
      />
      <Divider />
      <MemoizedMoneyButton outputs={moneybutton} />
    </>
  );
};
const CrowdfundedTokenPane = () => {
  const paymentAmounts = [
    { key: '1', text: '$1', value: 1 },
    { key: '5', text: '$5', value: 5 },
    { key: '10', text: '$10', value: 10 },
  ];
  const [paymentAmount, setPaymentAmount] = useState({ key: '0', text: 'Select payment amount', value: '0' });
  const [moneybutton, setMoneybutton] = useState([]);

  useEffect(() => {
    if (paymentAmount.value === '0') return;
    const outputs = constructECATPaymentMoneyButtonTx(paymentAmount.value);
    setMoneybutton(outputs);
  }, [paymentAmount]);

  return (
    <>
      <Message>
        <Message.Header>Guide</Message.Header>
        <p>
          Choose the total amount you want to be paid for this token. If you choose `$10`, after sum of payments are `$10`,
          everyone with the link will be able to access the file.
        </p>
      </Message>
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={paymentAmounts}
        search
        onChange={(e, d) => {
          const selected = paymentAmounts.filter((t) => t.value === d.value)[0];
          setPaymentAmount(selected);
        }}
        text={paymentAmount.text}
      />
      <Divider />
      <MemoizedMoneyButton outputs={moneybutton} />
    </>
  );
};

const NewTokenModal = ({ show, setShow, fileId }) => {
  const panes = [
    {
      menuItem: 'Normal',
      render: () => <NormalTokenPane setShow={setShow} fileId={fileId} />,
    },
    {
      menuItem: 'Paid',
      render: () => <PaidTokenPane />,
    },
    {
      menuItem: 'Crowdfunded',
      render: () => <CrowdfundedTokenPane />,
    },
  ];

  return (
    <Modal open={show}>
      <Header icon="archive" content={'Generate new token'} />
      <Modal.Content>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setShow(false)}>
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const FileDetails = ({ match }) => {
  const fileId = match.params.id;

  const { isRSAKeyLoading } = useBSV();

  const { fileDetails, fetchFileDetails } = useFileOps();

  const [showNewTokenModal, setShowNewTokenModal] = useState(false);

  useEffect(() => {
    fetchFileDetails(fileId);
  }, []);

  const revokeToken = async (token) => {
    return false;
  };

  const copyAccessLink = async (file, token) => {
    const url = urls.reader() + '/d/?h=' + file.bcat_transaction_hash + '&t=' + token;
    copy(url);
    showNotification('Copied', 'Link copied to clipboard', 'success');
  };

  if (fileDetails.isLoading || isRSAKeyLoading) {
    return <LoadingScreen loading={true} />;
  }

  const renderFilePartRow = (part) => {
    return (
      <Table.Row className={css(styles.bgRowCol, part.is_bcat && styles.bcatRow)}>
        <Table.Cell>{part.order}</Table.Cell>
        <Table.Cell className={css(styles.txCell)}>
          <div>{part.transaction.tx_hash}</div>
          <div>
            {part.transaction.is_broadcasted ? (
              <FaBroadcastTower className={css(styles.broadcastIcon, styles.success)} />
            ) : (
              <FaBroadcastTower className={css(styles.broadcastIcon, styles.failed)} />
            )}
            {part.transaction.is_confirmed ? (
              <FaRegCheckCircle className={css(styles.broadcastIcon, styles.success)} />
            ) : (
              <FaRegTimesCircle className={css(styles.broadcastIcon, styles.failed)} />
            )}
          </div>
        </Table.Cell>
        <Table.Cell>{part.part_md5_sum}</Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    );
  };

  return (
    <ErrorBoundary componentName="Profile">
      <PageWrapper>
        <NewTokenModal show={showNewTokenModal} setShow={setShowNewTokenModal} fileId={fileId} />
        <Container>
          <Header>{fileDetails.data.file_name}</Header>
          <Segment>
            <Header>Parts</Header>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>Transaction</Table.HeaderCell>
                  <Table.HeaderCell>Checksum</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {fileDetails.data.file_parts.slice(0, 3).map((part) => renderFilePartRow(part))}
                <Table.Row className={css(styles.showMoreButton)}>
                  <div style={{ marginTop: '15px' }}>Show More ...</div>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
          <Segment>
            <Header>
              Access Tokens <Button onClick={() => setShowNewTokenModal(true)}>New</Button>
            </Header>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Token</Table.HeaderCell>
                  <Table.HeaderCell>Modification date</Table.HeaderCell>
                  <Table.HeaderCell>Usage limit</Table.HeaderCell>
                  <Table.HeaderCell>Times used</Table.HeaderCell>
                  <Table.HeaderCell>Is Expired?</Table.HeaderCell>
                  <Table.HeaderCell>Access Link</Table.HeaderCell>
                  <Table.HeaderCell>Revoke</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {fileDetails.data.access_tokens.map((t) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{t.token}</Table.Cell>
                      <Table.Cell>{t.creation_date}</Table.Cell>
                      <Table.Cell>{t.usage_limit}</Table.Cell>
                      <Table.Cell>{t.times_used}</Table.Cell>
                      <Table.Cell>{t.is_expired ? 'Yes' : 'No'}</Table.Cell>
                      <Table.Cell>
                        <Button onClick={() => copyAccessLink(fileDetails.data, t.token)}>Copy Link</Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button onClick={() => revokeToken(t.token)} disabled>
                          Revoke
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Segment>
        </Container>
      </PageWrapper>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  showMoreButton: {
    backgroundImage: 'linear-gradient(transparent, white 50%)',
    position: 'absolute',
    bottom: '10px',
    height: '80px',
    width: '98%',
    display: 'flex',
    justifyContent: 'center',
  },
  bcatRow: {
    backgroundColor: 'beige',
  },
  broadcastIcon: {
    fontSize: '18px',
    marginLeft: '10px',
  },
  success: {
    color: 'green',
  },
  bgRowCol: {
    backgroundColor: 'rgba(0, 0, 0, .04)',
  },
  failed: {
    color: 'red',
  },
  txCell: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default withRouter(FileDetails);
