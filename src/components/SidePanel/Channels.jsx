import React, { useState, Fragment, useEffect } from "react";
import firebase from "../../firebase";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  FormField,
  Button
} from "semantic-ui-react";
const Channels = props => {
  // const [channels, setChannels] = useState([]);
  // const [modal, setModal] = useState(false);
  // const [channelname, setChannelName] = useState("");
  // const [channeldesc, setChannelDesc] = useState("");

  const [channel, setChannel] = useState({
    modal: false,
    channelname: "",
    channeldesc: "",
    channelsRef: firebase.database().ref("channels")
  });

  const { modal } = channel;

  const openModal = () => setChannel({ ...channel, modal: true });

  const closeModal = () => {
    console.log("button clicked");
    setChannel({ ...channel, modal: false });
  };

  const addChannel = () => {
    const { channelname, channeldesc, channelsRef, currentUser } = channel;
    console.log("add clicked");
    const key = channelsRef.push().key;

    const newChannelObj = {
      id: key,
      name: channelname,
      details: channeldesc,
      createdBy: {
        user: props.currentUser.displayName,
        avatar: props.currentUser.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannelObj)
      .then(() => {
        setChannel({
          ...channel,
          channelname: "",
          channeldesc: ""
        });
        closeModal();
        console.log("Channel added");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid(channel)) {
      addChannel();
    }
  };

  //make sure there are values for both channel name and description
  const isFormValid = ({ channelname, channeldesc }) => {
    return channelname && channeldesc;
  };

  const onChange = e => {
    setChannel({
      ...channel,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channel.length})
          <Icon name="add" onClick={openModal} style={{ cursor: "pointer" }} />
        </Menu.Item>
        {/* show all available channels here */}
      </Menu.Menu>
      {/* modalsection */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a New Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <FormField>
              <Input
                fluid
                name="channelname"
                label="Channel Name"
                onChange={onChange}
              />
            </FormField>
            <FormField>
              <Input
                fluid
                name="channeldesc"
                label="Description of the channel"
                onChange={onChange}
              />
            </FormField>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
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
