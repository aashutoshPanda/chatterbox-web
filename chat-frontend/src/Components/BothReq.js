import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RequestReceived from "./RequestReceived";
import RequestSent from "./RequestSent";
import Friends from "./Friends";

class Logout extends Component {
  handleClick = async (event) => {
    await this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="block">
            <RequestReceived></RequestReceived>
            <RequestSent></RequestSent>
            <Friends></Friends>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // userLogout: userInfo => dispatch(userLogout(userInfo))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
