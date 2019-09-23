import React from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import firebase from "firebase";
const UserPanel = () => {
  const dropDownOptions = () => [
    {
      id: "user",
      text: (
        <span>
          Logged in as <strong>user</strong>
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
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: "0" }}>
          <Header inverted as="h2" floated="left">
            <Icon name="code" />
            {/* app header */}
            <Header.Content>Chatbox</Header.Content>
          </Header>
        </Grid.Row>

        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown trigger={<span>user</span>} options={dropDownOptions()} />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
