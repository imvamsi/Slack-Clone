// import React, { useState } from "react";
// import firebase from "../../firebase";
// import { Segment, Input, Button } from "semantic-ui-react";
// const MessageForm = props => {
//   // const [msg, setMsg] = useState({
//   const [message, setMessage] = useState(" ");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState([]);
//   let messagesRef = firebase.database().ref("messages");
//   // const { message, loading, errors } = msg;

//   // const onChange = e => {
//   //   setMessage({
//   //     [e.target.name]: e.target.value
//   //   });
//   // };

//   const createMessages = () => {
//     const messages = {
//       timestamp: firebase.database.ServerValue.TIMESTAMP,
//       user: {
//         id: props.currentUser.uid,
//         name: props.currentUser.displayName,
//         avatar: props.currentUser.photoURL
//       },
//       content: message
//     };
//     return messages;
//   };
//   console.log(props.currentUser);

//   const sendMessage = event => {
//     event.preventDefault();
//     console.log("clicked");
//     //const { messagesRef } = props.messagesRef;
//     if (message) {
//       setLoading(true);
//       //console.log(props.messagesRef);
//       messagesRef
//         .child(props.currentChannel.id)
//         .push()
//         //call methods in paranthesis only for click events other than that call in ()
//         .set(createMessages())
//         .then(() => {
//           setLoading(false);
//           setErrors([]);
//           setMessage("");
//         })
//         .catch(err => {
//           console.log(err);
//           setLoading(false);
//           setErrors([errors.concat(err)]);
//         });
//     } else {
//       //errors: msg.errors.concat({ message: "add a new message" })
//       setErrors([errors.concat({ message: "add a new message" })]);
//     }
//   };

//   return (
//     <Segment className="message__form">
//       <Input
//         fluid
//         placeholder="Enter Your Message"
//         onChange={e => setMessage(e.target.value)}
//         name="message"
//         value={message}
//         style={{ marginBottom: "0.7em" }}
//         label={<Button icon={"add"} />}
//         labelPosition="left"
//         // className={
//         //   errors.some(e => e.message.includes("message")) ? "error" : ""
//         // }
//       />
//       <Button.Group icon widths="2">
//         <Button
//           onClick={sendMessage}
//           disabled={loading}
//           color="orange"
//           content="Add Reply"
//           labelPosition="left"
//           icon="edit"
//         />
//         <Button
//           color="teal"
//           content="Upload Media"
//           labelPosition="right"
//           icon="cloud upload"
//         />
//       </Button.Group>
//     </Segment>
//   );
// };

// export default MessageForm;

import React from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: []
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
      content: this.state.message
    };
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };

  render() {
    const { errors, message, loading } = this.state;

    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          onChange={this.handleChange}
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            disabled={loading}
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
  }
}

export default MessageForm;
