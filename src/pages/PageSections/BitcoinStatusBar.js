import React from 'react';
import { Message, Icon, Statistic, Radio } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { useBSV } from '../../store/bsvContext';

const BitcoinStatusBar = () => {
  const {
    isAccountSetupComplete,
    confirmedBalance,
    unconfirmedBalance,
    utxos,
    loadingStates,
    isSatchelSetup,
    isLoggedIn,
    isRSAValid,
    updateLock,
    setUpdateLock,
  } = useBSV();
  return (
    <Message
      style={{
        margin: 'unset',
        borderRadius: 'unset',
      }}
      icon="bitcoin"
      color="teal"
      content={
        isSatchelSetup === 'true' || isLoggedIn() ? (
          <>
            <Statistic size={'mini'} className={css(styles.statsWrapper)}>
              <Statistic.Value>{loadingStates.balance ? <Icon name="spinner" /> : confirmedBalance}</Statistic.Value>
              <Statistic.Label className={css(styles.statsLabel)}>Confirmed balance</Statistic.Label>
            </Statistic>

            <Statistic size={'mini'} className={css(styles.statsWrapper)}>
              <Statistic.Value>{loadingStates.balance ? <Icon name="spinner" /> : unconfirmedBalance}</Statistic.Value>
              <Statistic.Label className={css(styles.statsLabel)}>Unconfirmed balance</Statistic.Label>
            </Statistic>

            <Statistic size={'mini'} className={css(styles.statsWrapper)}>
              <Statistic.Value>{loadingStates.utxos ? <Icon name="spinner" /> : utxos.length}</Statistic.Value>
              <Statistic.Label className={css(styles.statsLabel)}>Utxos</Statistic.Label>
            </Statistic>

            <Statistic size={'mini'} className={css(styles.statsWrapper)}>
              <Statistic.Value>{isRSAValid ? 'Yes' : 'No'}</Statistic.Value>
              <Statistic.Label className={css(styles.statsLabel)}>Valid RSA?</Statistic.Label>
            </Statistic>

            <Statistic size={'mini'} className={css(styles.statsWrapper)}>
              <Statistic.Value>
                {!isAccountSetupComplete ? <Icon name="question circle" /> : <Icon name="check circle" />}
              </Statistic.Value>
              <Statistic.Label className={css(styles.statsLabel)}>Account setup</Statistic.Label>
            </Statistic>

            <Radio
              toggle
              checked={!updateLock}
              onChange={(e, dat) => {
                setUpdateLock(!dat.checked);
              }}
              style={{ marginLeft: '10px' }}
              label={'Live'}
            />
          </>
        ) : (
          <p>{'NOT LOGGED IN YET!'}</p>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  statsWrapper: {
    marginBottom: 'unset',
  },
  statsLabel: {
    fontSize: '10px',
  },
});

export default BitcoinStatusBar;
