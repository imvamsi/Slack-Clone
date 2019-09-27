import React, { Fragment, useState } from "react";
import firebase from "../../firebase";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
const Messages = props => {
  const [messages, setMessages] = useState({
    messagesRef: firebase.database().ref("messages")
    // channel: props.currentChannel,
    // user: props.currentUser
  });
  const messagesRef = firebase.database().ref("messages");
  return (
    <Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
      <MessageForm
        messagesRef={messagesRef}
        currentChannel={props.currentChannel}
        currentUser={props.currentUser}
      />
    </Fragment>
  );
};

export default Messages;
