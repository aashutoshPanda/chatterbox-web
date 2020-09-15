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
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>
        <label>Username</label>
        <input
          name='username'
          placeholder='Username'
          value={this.state.firstname}
          onChange={this.handleChange}
          /><br/>

        <label>Firstname</label>
        <input
          name='first_name'
          placeholder='Firstname'
          value={this.state.firstname}
          onChange={this.handleChange}
          /><br/>

        <label>Lastname</label>
        <input
          name='last_name'
          placeholder='Lastname'
          value={this.state.lastname}
          onChange={this.handleChange}
          /><br/>

        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>

        <input type='submit'/>
      </form>
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