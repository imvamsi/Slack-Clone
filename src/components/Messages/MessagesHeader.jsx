import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    const {
      channelName,
      numofuniqueUsers,
      handleSearch,
      searchLoading
    } = this.props;
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
            loading={searchLoading}
            onChange={handleSearch}
            size="mini"
            name="search"
            placeholder="Search Messages"
            icon="search"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
