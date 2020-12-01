import React from 'react';
import { Message, Button } from 'semantic-ui-react';
import { useBSV } from '../../store/bsvContext';

const BackupNotice = () => {
  const { isSatchelSetup, isLoggedIn, hasBackupBefore, downloadBackup } = useBSV();
  if (hasBackupBefore) {
    return <></>;
  }
  return (
    <Message
      style={{
        margin: 'unset',
        borderRadius: 'unset',
      }}
      icon="bitcoin"
      warning
      content={
        isSatchelSetup === 'true' || isLoggedIn() ? (
          <>
            <span>{'Please backup your keys and keep them some where safe!!'}</span>
            <Button
              style={{
                marginLeft: '20px',
              }}
              onClick={downloadBackup}
            >
              Backup
            </Button>
          </>
        ) : (
          <p>{'NOT LOGGED IN YET!'}</p>
        )
      }
    />
  );
};

export default BackupNotice;
