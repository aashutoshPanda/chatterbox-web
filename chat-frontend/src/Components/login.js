import React, { Component } from "react";
import { connect } from "react-redux";
import { userLoginFetch } from "../Redux/Login/LoginActions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.userLoginFetch(this.state);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="container">
        <div className="block">
          <form onSubmit={this.handleSubmit}>
            <h1 className="title">Login</h1>

            <div className="field">
              <label className="label">Username</label>
              <input
                type="text"
                className="input"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <br />
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <br />
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  userLoginFetch: (userInfo) => dispatch(userLoginFetch(userInfo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
