import React, { useState } from 'react';
// import {Col, Button, Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { StyleSheet, css } from 'aphrodite';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Card, Dimmer, Loader, Header, Icon, Button, Modal } from 'semantic-ui-react';
// import {Card, Dimmer} from 'tabler-react'

const FileCard = ({ file, loading }) => {
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <Card>
        <Card.Content className={css(styles.loaderCard)}>
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      <Modal open={showModal}>
        <Header icon="archive" content={file.file_name} />
        <Modal.Content>
          <p>{'Final transaction (linker): '}</p>
          <ReactMarkdown source={'`' + file.bcat_transaction_hash + '`'} escapeHtml={false} />
        </Modal.Content>
        <Modal.Actions>
          <Button style={{ float: 'left' }} onClick={() => setShowModal(false)} color="red">
            <Icon name="remove" /> Close
          </Button>
          <Button disabled={true}>{'Open locally'}</Button>
          <Link to={`/files/${file.id}`}>
            <Button color="primary">{'Manage tokens'}</Button>
          </Link>
        </Modal.Actions>
      </Modal>

      <Card className={css(styles.card)}>
        <Card.Content>
          <Card.Header className={css(styles.cardHeader)}>{file.file_name}</Card.Header>
          <Card.Description>
            <p>
              {'Size: '} {file.file_size}
            </p>
            <p>
              {'Parts count: '} {file.file_parts.length}
            </p>
            <p>
              {'Amount paid: '} {file.paid_amount || 'NAN'}
            </p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button className={css(styles.moreButton)} onClick={() => setShowModal(true)} basic color="green">
              {/* <Icon name='circle' /> */}
              <FiMoreHorizontal className={css(styles.buttonIcon)} />
              Details
            </Button>
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: '1.25rem',
  },
  cardHeader: {
    wordWrap: 'break-word',
    fontSize: '1.125rem',
    lineHeight: '1',
  },
  moreButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: '10px',
  },
  loaderCard: {
    minHeight: '120px',
  },
});

export default FileCard;
