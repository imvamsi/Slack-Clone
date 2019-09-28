import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
const MessagesHeader = ({ channelName, numofuniqueUsers }) => {
  return (
    //   channel title
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channelName}
          <Icon name={"star outline"} color="black" />
        </span>
        <Header.Subheader>{numofuniqueUsers}</Header.Subheader>
      </Header>

      {/* search channel */}
      <Header floated="right">
        <Input
          size="mini"
          name="search"
          placeholder="Search Messages"
          icon="search"
        ></Input>
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
