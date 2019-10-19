import React, { Component } from "react";
import firebase from "../../firebase";
import { Menu, Icon } from "semantic-ui-react";
export default class DirectMessages extends Component {
  state = {
    user: this.props.currentUser,
    users: [],

    //create a new users ref
    usersRef: firebase.database().ref("users"),
    //to see if the user is connected or not
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence")
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }

  addListener = currentuserID => {
    let loadedUsers = [];
    //look for change of state/events unders usersRef
    this.state.usersRef.on("child_added", snap => {
      //we dont want to include the currently authenticated user to the list **
      if (currentuserID !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

    this.state.connectedRef.on("value", snap => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentuserID);
        ref.set(true);
        ref.onDisconnect().remove(err => {
          if (err !== null) {
            console.log(err);
          }
        });
      }
    });

    //tracking users online status
    this.state.presenceRef.on("child_added", snap => {
      if (currentuserID !== snap.key) {
        this.addUserStatus(snap.key);
      }
    });

    this.state.presenceRef.on("child_removed", snap => {
      if (currentuserID !== snap.key) {
        this.addUserStatus(snap.key, false);
      }
    });
  };

  addUserStatus = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    this.setState({ users: updatedUsers });
  };

  isUserOnline = user => user.status === "online";

  render() {
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="mail" /> DIRECT MESSAGES
            </span>{" "}
            ({this.state.users.length}){" "}
            {/* <Icon name="mail" onClick={this.openModal} /> */}
          </Menu.Item>

          {this.state.users.map(user => (
            <Menu.Item
              key={user.uid}
              onClick={() => console.log(user)}
              style={{ opacity: 0.7, fontStyle: "italic" }}
            >
              <Icon
                name="circle"
                color={this.isUserOnline(user) ? "green" : "red"}
              />{" "}
              @ {user.name}
            </Menu.Item>
          ))}
        </Menu.Menu>
      </React.Fragment>
    );
  }
}
