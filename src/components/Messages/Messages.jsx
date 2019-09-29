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
    user: this.props.currentUser,
    numofUniqueUsers: "",
    searchTerm: "",
    searchLoading: false,
    searchResults: []
  };

  //mounts the components
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
      this.uniqueUsers(loadedMessages); //if i dont put this in here ... react shows too many renders!this
      //eventually is connected to componentdidmount and is called without side effects
    });
  };

  //reduce the messages array to a single value
  uniqueUsers = messages => {
    const result = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = result.length > 1 || result.length === 0;
    const numofUniqueUsers = `${result.length} user${plural ? "s" : ""}`;
    this.setState({ numofUniqueUsers });
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
  //shows the channel name on the UI
  displayChannel = channel => {
    return channel ? `# ${channel.name}` : "";
  };

  handleSearch = e => {
    this.setState(
      {
        searchTerm: e.target.value,
        searchLoading: true
      },
      () => this.searchMessages()
    );
  };

  searchMessages = () => {
    const newMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = newMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
  };

  render() {
    const {
      messagesRef,
      messages,
      channel,
      user,
      searchTerm,
      searchResults
    } = this.state;
    //prettier-disable
    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannel(channel)}
          numofuniqueUsers={this.state.numofUniqueUsers}
          handleSearch={this.handleSearch}
        />

        <Segment>
          <Comment.Group className="messages">
            {searchTerm
              ? this.displayMessages(searchResults)
              : this.displayMessages(messages)}
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
