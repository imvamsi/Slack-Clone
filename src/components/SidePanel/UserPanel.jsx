import React, { useState, useEffect } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
const UserPanel = props => {
  //const [users, setUsers] = useState(props.currentUser);

  //   useEffect(() => {
  //     setUsers({
  //       ...users,
  //       users: props.currentUser
  //     });
  //     //eslint-disable-next-line
  //   }, [props.currentUser]);

  const dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          {/* Dont put props in state */}
          Signed in as <strong>{props.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "sign out",
      text: <span onClick={handleSignOut}>Sign Out</span>
    }
  ];

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(console.log("Signed out the user"));
  };
  // console.log(props.user);

  return (
    <Grid style={{ background: "#3F0F3F" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: "0" }}>
          <Header inverted as="h2" floated="left">
            <Icon name="code" />
            {/* app header */}
            <Header.Content>Chatbox</Header.Content>
          </Header>

          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={props.currentUser.photoURL}
                    spaced="right"
                    avatar
                  />
                  {props.currentUser.displayName}
                </span>
              }
              options={dropDownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
