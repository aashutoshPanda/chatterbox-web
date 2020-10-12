import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../Redux/Logout/logoutAction.js";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  handleClick = async (event) => {
    await event.preventDefault();
    await localStorage.removeItem("token");
    await this.props.logoutUser();
    await this.props.history.push("/");
  };

  render() {
    // console.log(this.props.currentUser) button class="button is-primary is-outlined is-small">
    return (
      <div>
        {this.props.currentUser && (
          <button
            className="button is-primary is-outlined "
            onClick={this.handleClick}
          >
            Log Out
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
