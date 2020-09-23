import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../Redux';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
  state = {
    username:"",
    password:"",
    first_name: "",
    last_name:""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.userPostFetch(this.state)
    // await console.log("after userPosrFetch",this.state.currentUser)
    await this.props.history.push('/dashboard');
  }

  render() {
    // console.log(this.state)
    return (   
      <div class="container">
        <div class="block">   
          <form onSubmit={this.handleSubmit}>

            <h1 class="title">Sign Up For An Account</h1>

            <div class="field">
            <label class="label">Username</label>
            <input
              type="text" 
              class="input"
              name='username'
              placeholder='Username'
              value={this.state.firstname}
              onChange={this.handleChange}
              /><br/>
            </div>

            <div class="field">
            <label class="label">Firstname</label>
            <input
              type="text" 
              class="input"
              name='first_name'
              placeholder='Firstname'
              value={this.state.firstname}
              onChange={this.handleChange}
              /><br/>
            </div>

            <div class="field">
            <label class="label">Lastname</label>
            <input
              type="text" 
              class="input"
              name='last_name'
              placeholder='Lastname'
              value={this.state.lastname}
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
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));