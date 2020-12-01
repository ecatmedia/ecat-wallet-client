import React from 'react';
import { Item, Button, Radio } from 'semantic-ui-react';
import FileIcon, { defaultStyles } from 'react-file-icon';

const FileItem = ({ file, actions, onEncryptionChange, extension }) => {
  return (
    <Item>
      <FileIcon extension={extension} {...defaultStyles[extension]} size="70px" />
      <Item.Content>
        <Item.Header as="a">{file.name}</Item.Header>
        <Item.Meta>{file.readyMessage}</Item.Meta>
        <Item.Extra style={{ display: 'flex', alignItems: 'center' }}>
          {actions.map(action => {
            return (
              <Button
                onClick={action.onClick}
                disabled={file.readyLoading || file.isPorcessed}
                loading={file.readyLoading}
                style={{
                  margin: '2px',
                }}
              >
                {action.text}
              </Button>
            );
          })}
          <Radio
            toggle
            checked={file.is_encrypted}
            onChange={onEncryptionChange}
            style={{ marginLeft: '10px' }}
            label={'Encrypted'}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default FileItem;
