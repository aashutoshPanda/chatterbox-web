import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogout } from "../Redux";
import { withRouter } from "react-router-dom";
import ChatComponent from "./ChatComponent";
import Users from "./Users";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="block">
            <div className="columns">
              <div className="column is-5 has-background-white-bis">
                <Users></Users>
              </div>
              <div className="column is-7 has-background-grey-lighter">
                <ChatComponent></ChatComponent>
              </div>
            </div>
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
  userLogout: (userInfo) => dispatch(userLogout(userInfo)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
