import React, { useState, useEffect } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
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
          <Dropdown
            trigger={<span>{props.currentUser.displayName}</span>}
            options={dropDownOptions()}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);
