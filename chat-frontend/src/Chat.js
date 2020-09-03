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

import "stream-chat-react/dist/css/index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new StreamChat("91668");
    const userToken = localStorage.getItem("token");
    const tokenUserId = localStorage.getItem("user_id");
    const tokenUserName = localStorage.getItem("user_name");
    this.client.setUser(
      {
        id: tokenUserId,
        name: tokenUserName,
        image:
          "https://getstream.io/random_svg/?id=+" +
          tokenUserId +
          "+&name=" +
          tokenUserName,
      },
      userToken
    );

    this.channel = this.client.channel("messaging", "godevs", {
      image:
        "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
      name: "Talk about Go",
    });
  }

  render() {
    return (
      <Chat client={this.client} theme={"messaging light"}>
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

export default App;
