import React, { useState, Fragment, useEffect } from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel } from "../../actions/Actions";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  FormField,
  Button
} from "semantic-ui-react";
//import { addListener } from "cluster";
const Channels = props => {
  // const [channels, setChannels] = useState([]);
  // const [modal, setModal] = useState(false);
  // const [channelname, setChannelName] = useState("");
  // const [channeldesc, setChannelDesc] = useState("");

  const [channel, setChannel] = useState({
    channels: [],
    modal: false,
    channelname: "",
    channeldesc: "",
    channelsRef: firebase.database().ref("channels")
  });
  const { channelname, channeldesc, channelsRef, channels } = channel;
  useEffect(() => {
    addListeners();
    //eslint-disable-next-line
  }, []);

  const addListeners = () => {
    const { channels } = channel;
    let displayChannel = [];
    channel.channelsRef.on("child_added", snap => {
      displayChannel.push(snap.val());
      setChannel({
        ...channel,
        channels: displayChannel
      });
    });
  };

  const { modal } = channel;

  const openModal = () => setChannel({ ...channel, modal: true });

  const closeModal = () => {
    console.log("button clicked");
    setChannel({ ...channel, modal: false });
  };

  const addChannel = () => {
    const { channelname, channeldesc, channelsRef } = channel;
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

  // const changeChannel = channel => {
  //   setCurrentChannel(channel);
  // };

  const showChannels = channels => {
    console.log(channel);
    return (
      channels.length > 0 &&
      channels.map(channel => (
        <Menu.Item
          key={channel.id}
          onClick={() => props.dispatch(setCurrentChannel(channel))}
          //onClick={() => setCurrentChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
        >
          # {channel.name}
        </Menu.Item>
      ))
    );
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length})
          <Icon name="add" onClick={openModal} style={{ cursor: "pointer" }} />
        </Menu.Item>
        {/* show all available channels here */}
        {showChannels(channels)}
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
//const mapStateToProps = { setCurrentChannel };

function mapStatesToProps(state) {
  return {};
}
export default connect(mapStatesToProps)(Channels);
