import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import * as uuid from 'uuid';
import { StyleSheet, css } from 'aphrodite';

export class FileButton extends React.Component {
  constructor(props) {
    super(props);

    this.id = uuid.v1();
    this.onChangeFile = this.onChangeFile.bind(this);
    this.state = {
      filePath: '',
    };
  }

  render() {
    return (
      <div className={css(styles.wrapper)}>
        <input hidden id={this.id} type="file" onChange={this.onChangeFile} />
        <Input placeholder="Select your backup key ..." value={this.state.filePath} />
        <Button {...this.props} as="label" htmlFor={this.id}>
          Browse
        </Button>
      </div>
    );
  }

  onChangeFile() {
    const fileButton = document.getElementById(this.id);
    const file = fileButton ? fileButton.files[0] : null;
    this.setState({ filePath: file.name });
    if (this.props.onSelect) {
      this.props.onSelect(file);
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: '20px',
  },
});

export default FileButton;
