import React from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

class FileUpload extends React.Component {
  state = {
    file: null,
    authorized: ["image/jpg", "image/jpeg", "image/png"]
  };

  addFile = e => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadImage, closeModal } = this.props;
    console.log(this.isAuthorized(file.name));
    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadImage(file, metadata);
        closeModal();
        console.log("clicked");
        this.clearFile();
      }
    }
  };

  clearFile = () => this.setState({ file: null });

  isAuthorized = filename => {
    console.log(mime.lookup(filename));
    return this.state.authorized.includes(mime.lookup(filename));
  };

  render() {
    const { modal, closeModal } = this.props;

    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input
            onChange={this.addFile}
            fluid
            label="File types: jpg, png"
            name="file"
            type="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.sendFile} color="green" inverted>
            <Icon name="checkmark" /> Send
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileUpload;
