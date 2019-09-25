// import React, { useState, Fragment, useEffect } from "react";
// import firebase from "../../firebase";
// import { connect } from "react-redux";
// import { setCurrentChannel } from "../../actions/Actions";
// import {
//   Menu,
//   Icon,
//   Modal,
//   Form,
//   Input,
//   FormField,
//   Button
// } from "semantic-ui-react";

// const Channels = ({ setCurrentChannel }) => {
//   //const { user } = props.currentUser;
//   const [channel, setChannel] = useState({
//     channels: [],
//     modal: false,
//     activeChannel: "",
//     channelname: "",
//     channeldesc: "",
//     channelsRef: firebase.database().ref("channels"),
//     firstLoad: true
//   });
//   const {
//     channelname,
//     channeldesc,
//     channelsRef,
//     channels,
//     firstLoad
//   } = channel;
//   useEffect(() => {
//     addListeners();
//     //eslint-disable-next-line
//   }, []);

//   const addListeners = () => {
//     const { channels } = channel;
//     let displayChannel = [];
//     channel.channelsRef.on("child_added", snap => {
//       displayChannel.push(snap.val());
//       setChannel(
//         {
//           ...channel,
//           channels: displayChannel
//         },
//         setFirstChannel()
//       );
//     });
//   };

//   const setFirstChannel = () => {
//     const firstChannel = channels[0];
//     if (firstLoad && channels.length > 0) {
//       setCurrentChannel(firstChannel);
//       setActiveChannel(channel);
//     }
//     setChannel({
//       ...channel,

//       firstLoad: false
//     });
//   };
//   const setActiveChannel = channel => {
//     setChannel({ activeChannel: channel.id });
//   };

//   const { modal } = channel;

//   const openModal = () => setChannel({ ...channel, modal: true });

//   const closeModal = () => {
//     console.log("button clicked");
//     setChannel({ ...channel, modal: false });
//   };

//   const addChannel = () => {
//     const { channelname, channeldesc, channelsRef } = channel;
//     console.log("add clicked");
//     const key = channelsRef.push().key;

//     const newChannelObj = {
//       id: key,
//       name: channelname,
//       details: channeldesc
//       // createdBy: {
//       //   user: user.displayName,
//       //   avatar: user.photoURL
//       // }
//     };

//     channelsRef
//       .child(key)
//       .update(newChannelObj)
//       .then(() => {
//         setChannel({
//           ...channel,
//           channelname: "",
//           channeldesc: ""
//         });
//         closeModal();
//         console.log("Channel added");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (isFormValid(channel)) {
//       addChannel();
//     }
//   };

//   //make sure there are values for both channel name and description
//   const isFormValid = ({ channelname, channeldesc }) => {
//     return channelname && channeldesc;
//   };

//   const onChange = e => {
//     setChannel({
//       ...channel,
//       [e.target.name]: e.target.value
//     });
//   };

//   // const changeChannel = channel => {
//   //   setCurrentChannel(channel);
//   // };

//   const showChannels = channels => {
//     console.log(channel);
//     return (
//       channels.length > 0 &&
//       channels.map(channel => (
//         <Menu.Item
//           key={channel.id}
//           onClick={setCurrentChannel(channel)}
//           name={channel.name}
//           style={{ opacity: 0.7 }}
//           active={channel.id === channel.activeChannel}
//         >
//           # {channel.name}
//         </Menu.Item>
//       ))
//     );
//   };

//   return (
//     <Fragment>
//       <Menu.Menu style={{ paddingBottom: "2em" }}>
//         <Menu.Item>
//           <span>
//             <Icon name="exchange" /> CHANNELS
//           </span>{" "}
//           ({channels.length})
//           <Icon name="add" onClick={openModal} style={{ cursor: "pointer" }} />
//         </Menu.Item>
//         {/* show all available channels here */}
//         {showChannels(channels)}
//       </Menu.Menu>
//       {/* modalsection */}
//       <Modal basic open={modal} onClose={closeModal}>
//         <Modal.Header>Add a New Channel</Modal.Header>
//         <Modal.Content>
//           <Form onSubmit={handleSubmit}>
//             <FormField>
//               <Input
//                 fluid
//                 name="channelname"
//                 label="Channel Name"
//                 onChange={onChange}
//               />
//             </FormField>
//             <FormField>
//               <Input
//                 fluid
//                 name="channeldesc"
//                 label="Description of the channel"
//                 onChange={onChange}
//               />
//             </FormField>
//           </Form>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button color="green" inverted onClick={handleSubmit}>
//             <Icon name="checkmark" /> Add
//           </Button>
//           <Button color="red" onClick={closeModal} inverted>
//             <Icon name="remove" /> Cancel
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     </Fragment>
//   );
// };

// // function mapStateToProps(state) {
// //   return {
// //     //currentChannel: state.channel.currentChannel
// //   };
// // }
// //export default connect(mapStateToProps)(Channels);

// export default connect(
//   null,
//   { setCurrentChannel }
// )(Channels);

import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel } from "../../actions/Actions";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    activeChannel: "",
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true
  };

  componentDidMount() {
    this.addListeners();
  }

  componentDidUnMount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel }
)(Channels);
