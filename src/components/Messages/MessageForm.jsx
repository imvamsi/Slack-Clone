import React, { useState } from "react";
import firebase from "../../firebase";
import { Segment, Input, Button } from "semantic-ui-react";
const MessageForm = props => {
  // const [msg, setMsg] = useState({
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // const { message, loading, errors } = msg;

  const onChange = e => {
    setMessage({
      [e.target.name]: e.target.value
    });
  };

  const createMessages = () => {
    const messages = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      userObj: {
        id: props.currentUser.uid,
        name: props.currentUser.displayName,
        avatar: props.currentUser.photoURL
      },
      content: message
    };
    return messages;
  };

  const sendMessage = event => {
    event.preventDefault();
    console.log("clicked");

    if (message) {
      setLoading({ loading: true });
      console.log(props.messagesRef);
      props.messagesRef
        .child(props.currentChannel.id)
        .push()
        .set(createMessages)
        .then(() => {
          setLoading(false);
          setErrors([]);
          setMessage("");
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setErrors([errors.concat(err)]);
        });
    } else {
      //errors: msg.errors.concat({ message: "add a new message" })
      setErrors([errors.concat({ message: "add a new message" })]);
    }
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        onChange={onChange}
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="Enter Your Message"
        // className={
        //   msg.errors.some(e => e.message.includes("message")) ? "error" : ""
        // }
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMessage}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
