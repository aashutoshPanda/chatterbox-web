import React, { Component } from "react";
import { connect } from "react-redux";
import { userLoginFetch } from "../Redux/Login/LoginActions";
import { withRouter } from "react-router-dom";
import {reset} from "../Redux/Login/LoginActions"

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: [],
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    await this.props.userLoginFetch(this.state);

    if (this.props.errors.length > 0) {
      this.setState({ errors:this.props.errors });
      return;
    }

    this.props.history.push("/dashboard");
  };
  componentWillUnmount(){
    this.props.reset();
  }
  render() {
    console.log("error from redux", this.props.errors);
    return (
      <form onSubmit={this.handleSubmit}>
        <section className="hero is-primary is-fullheight">
          {this.state.errors.map((error) => (
            <div className="notification is-danger is-light">{error}</div>
          ))}
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                  <div action="" className="box">
                    <div className="field">
                      <label className="label">
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
                      <button className="button is-success">Login</button>
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
  userLoginFetch: (userInfo) => dispatch(userLoginFetch(userInfo)),
  reset:()=>dispatch(reset())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
