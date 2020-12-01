import React from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';

const ControlSegment = ({ modalsConfig, setModalsConfig }) => {
  return (
    <Segment.Group>
      <Segment style={{ textAlign: 'center' }} className={css(styles.buttonsSegment)}>
        <Button primary style={{ margin: '5px' }} onClick={() => setModalsConfig({ ...modalsConfig, privateInfo: true })}>
          <Icon name={'key'} />
          Show Mnemonic/Private Key
        </Button>
        <Button
          style={{ margin: '5px' }}
          color={'black'}
          onClick={() => setModalsConfig({ ...modalsConfig, restoreWallet: true })}
        >
          <Icon name={'undo'} />
          Restore wallet
        </Button>
        <Button
          style={{ margin: '5px' }}
          color={'teal'}
          basic
          onClick={() => setModalsConfig({ ...modalsConfig, newWallet: true })}
        >
          <Icon name={'add'} />
          Generate new wallet
        </Button>
        <Button
          style={{ margin: '5px' }}
          basic
          color={'red'}
          onClick={() => setModalsConfig({ ...modalsConfig, logoutConfirm: true })}
        >
          <Icon name={'sign-out'} />
          Logout this wallet
        </Button>
      </Segment>
    </Segment.Group>
  );
};

const styles = StyleSheet.create({
  buttonsSegment: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default ControlSegment;
