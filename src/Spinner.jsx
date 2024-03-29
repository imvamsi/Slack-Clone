import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => {
  return (
    <Dimmer active>
      <Loader size="huge" content={"Hang on while we prepare the chat..."} />
    </Dimmer>
  );
};

export default Spinner;
