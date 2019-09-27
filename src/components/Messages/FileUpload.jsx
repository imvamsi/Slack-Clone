import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
const FileUpload = props => {
  return (
    <Modal basic open={props.modal} onClose={props.closeModal}>
      <Modal.Header>Select an image</Modal.Header>
      <Modal.Content>
        <Input fluid name="file" type="file" label="File Type" />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted>
          <Icon name="checkmark" /> Upload
        </Button>
        <Button color="red" inverted onClick={props.closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileUpload;
