import React, { useEffect } from 'react';
import { Item, Header, Segment, Icon, Modal, Button, Progress, Grid, Message } from 'semantic-ui-react';

import { getExtensionByMimetype } from '../../config/mimetypes';

import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import DZone from './dropzone';
import FileItem from './FileItem';

import { useStore } from '../../store';
import PageWrapper from '../PageSections/PageWrapper';
import { useBSV } from '../../store/bsvContext';
import { useUpload } from '../../store/uploadContext';

const Upload = () => {
  const { modalsConfig, setModalsConfig } = useStore();
  const { isAccountSetupComplete, setUpdateLock } = useBSV();
  const { runGetOrCreate, files, setFiles, readyFiles, setReadyFiles, startFileUpload, filesUploadStatus } = useUpload();

  useEffect(() => {
    setUpdateLock(true);
  }, []);

  const addNewFileToQueue = file => {
    setFiles(prev => {
      return [...prev, file];
    });
  };

  const removeFileFromQueue = key => {
    setReadyFiles(prev => {
      if (prev.length === 1) return [];
      prev.splice(key, 1);
      return prev;
    });
  };

  const initilizeFilesFromDropZone = files => {
    Object.values(files).forEach(f => {
      addNewFileToQueue(f);
    });
  };

  const setFileEncryptionMode = (val, key) => {
    let items = [...files];
    let item = Object.assign(items[key], { is_encrypted: val.checked });
    items[key] = item;
    setFiles(items);
  };

  function renderFilesList() {
    if (!files || !Object.keys(files).length) return '';
    return files.map((file, key) => {
      return (
        <FileItem
          file={file}
          extension={getExtensionByMimetype(file.type)}
          actions={[{ text: 'Process', onClick: () => runGetOrCreate(file, key) }]}
          onEncryptionChange={(e, dat) => setFileEncryptionMode(dat, key)}
        />
      );
    });
  }

  function renderReadyFilesList() {
    if (!readyFiles || !Object.keys(readyFiles).length) return '';
    return readyFiles.map((file, key) => {
      return (
        <>
          <FileItem
            file={file}
            extension={getExtensionByMimetype(file.type)}
            actions={[
              { text: 'Cancel', onClick: () => removeFileFromQueue(key) },
              { text: 'Start Upload', onClick: () => startFileUpload(file, key) },
            ]}
          />
          <Progress
            indicating
            percent={filesUploadStatus && Object.keys(filesUploadStatus).indexOf(file.id) !== -1 ? filesUploadStatus[file.id] : 0}
            size="tiny"
          />
        </>
      );
    });
  }

  return (
    <ErrorBoundary componentName="Upload">
      <PageWrapper>
        <Modal basic open={modalsConfig.showSecondModal !== -1}>
          <Header icon="archive" content="Transactions Done" />

          <Modal.Content>
            <p></p>
            <Segment.Group style={{ color: 'black' }}>
              <p>{'You files have been uploaded successfuly!'}</p>
              {files && files[modalsConfig.showSecondModal] && !files[modalsConfig.showSecondModal].broadcastLoading
                ? files[modalsConfig.showSecondModal].transactions.map((tx, idx) => {
                    const failed = !tx.broadcast && modalsConfig.failedBroadcasts.map(t => t.hash).indexOf(tx.hash) !== -1;
                    return (
                      <Segment inverted color={failed ? 'red' : 'green'}>
                        <p>
                          <Icon name="circle" />
                          <span>{tx.hash}</span>
                        </p>
                      </Segment>
                    );
                  })
                : null}
            </Segment.Group>
          </Modal.Content>
          <Modal.Actions>
            <Button variant="secondary" onClick={() => setModalsConfig(prev => ({ ...prev, showSecondModal: -1 }))}>
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </Modal>

        <Grid>
          {isAccountSetupComplete ? (
            <Grid.Row>
              <Grid.Column width={8}>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <DZone onFilesChange={initilizeFilesFromDropZone} />
                  </Grid.Column>
                </Grid.Row>
                <br />
                <br />
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Header as="h2">Non-processed files</Header>
                    {!files.length ? (
                      <Message warning>
                        <Message.Header>No files selected!</Message.Header>
                        <p>Select some files and process them here.</p>
                      </Message>
                    ) : null}
                    <Item.Group>{renderFilesList()}</Item.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h2">Ready to upload files</Header>
                {!readyFiles.length ? (
                  <Message warning>
                    <Message.Header>You have no ready files!</Message.Header>
                    <p>Select some files below and process them.</p>
                  </Message>
                ) : null}
                <Item.Group>{renderReadyFilesList()}</Item.Group>
              </Grid.Column>
            </Grid.Row>
          ) : (
            <>
              <p>{'Your account setup is not complete yet. One of your critical required informations is missing'}</p>
              <p>
                {
                  'Please make sure you have your wallet and RSA private key setup and also make sure you keep a backup of them somewhere save'
                }
              </p>
            </>
          )}
        </Grid>
      </PageWrapper>
    </ErrorBoundary>
  );
};

export default Upload;
