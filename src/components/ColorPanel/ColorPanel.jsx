import React from "react";
import { Sidebar, Menu, Button, Divider } from "semantic-ui-react";

const ColorPanel = () => {
  return (
    <div>
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="very small" color="green" />
      </Sidebar>
    </div>
  );
};

export default ColorPanel;
