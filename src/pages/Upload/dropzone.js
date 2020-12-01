import React from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

export default function Previews(props) {
  const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, audio/*, video/*, application/pdf, text/*, application/javascript',
    onDrop: acceptedFiles => {
      let result = acceptedFiles.map((f, i) => {
        return Object.assign(f, {
          preview: URL.createObjectURL(f),
          idx: i,
          is_encrypted: true,
        });
      });
      result = arrayToObject(result, 'idx');
      if (props.onFilesChange) {
        return props.onFilesChange(result);
      }
    },
  });

  return (
    <Segment placeholder {...getRootProps({ className: 'dropzone' })}>
      <Header icon>
        <Icon name="file outline" />
        Drag n Drop your files here ...
      </Header>
      <input {...getInputProps()} />
      <Button primary>Add Files</Button>
    </Segment>
  );
}
