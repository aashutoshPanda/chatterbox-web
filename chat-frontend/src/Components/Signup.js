import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../Redux';

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

  handleSubmit = event => {
    event.preventDefault()
    this.props.userPostFetch(this.state)
  }

  render() {
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



const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);