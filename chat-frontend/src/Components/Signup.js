import React, { Component } from "react";
import { connect } from "react-redux";
import { userPostFetch, errorReset } from "../Redux";
import { withRouter } from "react-router-dom";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    errors: [],
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.userPostFetch(this.state);
  };
  componentWillUnmount() {
    this.props.errorReset();
  }
  render() {
    // const { errors } = this.props.errors;
    return (
      <form onSubmit={this.handleSubmit}>
        <section class="hero is-primary is-fullheight">
          <div className="hero-body">
            <div className="container">
              {this.props.errors.map((error) => (
                <div className="columns is-centered">
                  <div className="notification is-danger is-light column is-4 ">
                    {error}
                  </div>
                </div>
              ))}
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                  <div action="" className="box">
                    <div className="field">
                      <label className="label">Username</label>
                      <div className="control has-icons-left">
                        <input
                          type="text"
                          className="input"
                          name="username"
                          placeholder="Username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          required
                        ></input>
                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">First Name</label>
                      <div className="control has-icons-left">
                        <input
                          type="text"
                          className="input"
                          name="first_name"
                          placeholder="First Name"
                          value={this.state.first_name}
                          onChange={this.handleChange}
                          required
                        ></input>
                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Last Name</label>
                      <div className="control has-icons-left">
                        <input
                          type="text"
                          className="input"
                          name="last_name"
                          placeholder="Last Name"
                          value={this.state.last_name}
                          onChange={this.handleChange}
                          required
                        ></input>
                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control has-icons-left">
                        <input
                          className="input"
                          type="password"
                          name="password"
                          placeholder="********"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                        ></input>
                        <span className="icon is-small is-left">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-success">Sign Up</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  errors: state.auth.errors,
});

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo)),
  errorReset: () => dispatch(errorReset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
