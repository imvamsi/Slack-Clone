import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
export default class DirectMessages extends Component {
  state = {
    users: []
  };
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
        </Menu.Menu>
      </React.Fragment>
    );
  }
}
