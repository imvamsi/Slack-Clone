// import React, { Fragment, useState, useEffect } from "react";
// import firebase from "../../firebase";
// import { Segment, Comment } from "semantic-ui-react";
// import MessagesHeader from "./MessagesHeader";
// import MessageForm from "./MessageForm";
// import Message from "./Message";
// import "../App.css";

// const Messages = props => {
//   const [messages, setMessages] = useState([""]);
//   const [messagesLoading, setMessagesLoading] = useState(true);
//   const [channel, setChannel] = useState(props.currentChannel);
//   const [user, setUser] = useState(props.currentUser);
//   const [messagesRef, setMessagesRef] = useState(
//     firebase.database().ref("messages")
//   );

//   //currentUser: props.currentUser
//   //const { messagesRef, currentChannel, currentUser, message } = messages;
//   useEffect(() => {
//     if (channel && user) {
//       addListener(channel.id);
//     }
//     //eslint-disable-next-line
//   }, []);

//   const addListener = channelid => {
//     addMessageonScreen(channelid);
//   };

//   const addMessageonScreen = channelid => {
//     let loadedMessagesonScreen = [];
//     messagesRef.child(channelid).on("child_added", snap => {
//       loadedMessagesonScreen.push(snap.val());
//       console.log(loadedMessagesonScreen);

//       setMessages([loadedMessagesonScreen]);
//       setMessagesLoading(false);
//     });
//   };

//   const showMessages = messages => {
//     return (
//       messages.length > 0 &&
//       messages.map(message => (
//         <Message
//           key={message.timestamp}
//           message={message}
//           user={user}
//           //userObj={currentUser.userObj}
//         />
//       ))
//     );
//     //console.log(message);
//   };

//   //const messagesRef = firebase.database().ref("messages");
//   return (
//     <Fragment>
//       <MessagesHeader />
//       <Segment>
//         <Comment.Group className="messages">
//           {showMessages(messages)}
//         </Comment.Group>
//       </Segment>
//       <MessageForm
//         messagesRef={messagesRef}
//         currentChannel={channel}
//         currentUser={user}
//       />
//     </Fragment>
//   );
// };

// export default Messages;

import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
    });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

  render() {
    const { messagesRef, messages, channel, user } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
