import React, { Component } from "react";

export class initialChat extends Component {
  render() {
    return (
      <>
        <div className="columns is-centered">
          <img
            className="column is-8"
            src="https://icon-library.net//images/found-icon/found-icon-20.jpg"
            width="350"
          ></img>
        </div>
        <div className="columns is-centered is-vcentered">
          <p className="title has-text-info pl-3 pr-3">Please select a friend you want to chat with</p>
        </div>
      </>
    );
  }
}

export default initialChat;
