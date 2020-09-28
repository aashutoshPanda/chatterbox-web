import React, { Component } from "react";
import { connect } from "react-redux";
import { userPostFetch } from "../Redux";
import { withRouter } from "react-router-dom";
import {reset} from "../Redux/Signup/SignupActions"

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
    await this.props.userPostFetch(this.state);

    console.log("error from redux", this.props.errors);

    if (this.props.errors.length > 0) {
      this.setState({ errors: this.props.errors });
    }
    else this.props.history.push("/dashboard");
  };
  componentWillUnmount(){
    this.props.reset();
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <section className="hero is-primary is-fullheight">
          {errors.map((error) => (
            <div className="notification is-danger is-light">{error}</div>
          ))}
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                  <div action="" className="box">
                    <div className="field">
                      <label  className="label">
                        Username
                      </label>
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
                      <label className="label">
                        First Name
                      </label>
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
                      <label className="label">
                        Last Name
                      </label>
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
                      <label className="label">
                        Password
                      </label>
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
  reset:()=>dispatch(reset())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));


