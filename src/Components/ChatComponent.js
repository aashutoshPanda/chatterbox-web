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

import { resetOtherUser } from "../Redux/OtherUser/OtherUserAction.js";

import InitialChat from "./initialChat"
class MainChat extends Component {
  constructor(props) {
    super(props);

    this.chatClient = new StreamChat(secrets["STREAM_API_KEY"]);
    this.userToken = localStorage.getItem("chatToken");
    this.chatClient.setUser(
      {
        id: this.props.currentUser.username,
        name:
          this.props.currentUser.first_name +
          " " +
          this.props.currentUser.last_name,
        image: this.props.currentUser.profile_image_url,
      },
      this.userToken
    );
  }
  componentWillUnmount() {
    this.props.resetCurrentUser();
  }
  render() {
    const channelName =
      this.props.currentUser.username < this.props.otherUser.username
        ? this.props.currentUser.username + this.props.otherUser.username
        : this.props.otherUser.username + this.props.currentUser.username;

    const channel = this.chatClient.channel("messaging", channelName, {
      image: this.props.otherUser.profile_image_url,
      name:
        this.props.otherUser.first_name + " " + this.props.otherUser.last_name,
    });
    console.log("channel", channel)
    console.log("other user", this.props.otherUser);
    console.log("current user", this.props.currentUser);
    if(this.props.otherUser===false) return(
      <InitialChat></InitialChat>
    )
    else return (
      <Chat client={this.chatClient} theme={"messaging light"}>
        <Channel channel={channel}>
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
  otherUser: state.OtherUser.otherUser,
});

const mapDispatchToProps = (dispatch) => ({
  resetCurrentUser: () => dispatch(resetOtherUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
