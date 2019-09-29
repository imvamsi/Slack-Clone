import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
const SidePanel = props => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#3F0F3F", fontSize: "1.2rem" }}
    >
      <UserPanel currentUser={props.currentUser} />
      <Channels currentUser={props.currentUser} />
      <DirectMessages />
    </Menu>
  );
};

export default SidePanel;
