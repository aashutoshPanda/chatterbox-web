import React, { Component } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
} from "stream-chat-react";
import { MessageList, MessageInput } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { connect } from "react-redux";

import "stream-chat-react/dist/css/index.css";
import { secrets } from "../secrets";
class MainChat extends Component {
  constructor(props) {
    super(props);
    this.chatClient = new StreamChat(secrets["STREAM_API_KEY"]);
    this.username = this.props.currentUser.username;
    this.fullName =
      this.props.currentUser.first_name +
      " " +
      this.props.currentUser.last_name;
    this.profile_image_url = this.props.currentUser.profile_image_url;
    this.userToken = localStorage.getItem("token");
    this.chatClient.setUser(
      {
        id: this.username,
        name: this.fullName,
        image: this.profile_image_url,
      },
      this.userToken
    );

    this.channel = this.chatClient.channel("messaging", "godevs", {
      // add as many custom fields as you'd like
      image:
        "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
      name: "Talk about Go",
    });
  }

  render() {
    console.log("current user", this.props.currentUser);
    return (
      <Chat client={this.chatClient} theme={"messaging light"}>
        <Channel channel={this.channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // getFriends: () => dispatch(getFriends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
