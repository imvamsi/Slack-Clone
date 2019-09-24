import React, { useState, Fragment, useEffect } from "react";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  FormField,
  Button
} from "semantic-ui-react";
const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channelname, setChannelName] = useState("");
  const [channeldesc, setChannelDesc] = useState("");

  const openModal = () => setModal(true);

  const closeModal = () => {
    console.log("button clicked");
    setModal(false);
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length})
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {/* show all available channels here */}
      </Menu.Menu>
      {/* modalsection */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a New Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <FormField>
              <Input
                fluid
                name="channelname"
                label="Channel Name"
                onChange={e => setChannelName(e.target.value)}
              />
            </FormField>
            <FormField>
              <Input
                fluid
                name="channeldesc"
                label="Description of the channel"
                onChange={e => setChannelDesc(e.target.value)}
              />
            </FormField>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" onClick={closeModal} inverted>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default Channels;
