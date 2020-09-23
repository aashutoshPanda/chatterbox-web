import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../Redux/Login/LoginActions';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit =async event => {
    event.preventDefault()
    await this.props.userLoginFetch(this.state)
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div class="container">
        <div class="block">
          <form onSubmit={this.handleSubmit}>
            <h1 class="title">Login</h1>

            <div class="field">
              <label class="label">Username</label>
              <input
                type="text" 
                class="input"
                name='username'
                placeholder='Username'
                value={this.state.username}
                onChange={this.handleChange}
                /><br/>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <input
                class="input"
                type='password'
                name='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
                /><br/>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));