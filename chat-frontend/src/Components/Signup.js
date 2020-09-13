import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../Redux';

class Signup extends Component {
  state = {
    firstname: "",
    lastname:"",
    email: "",
    password:""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.userPostFetch(this.state)
    .then(this.props.changeState)
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>
          
        <label>Firstname</label>
        <input
          name='firstname'
          placeholder='Firstname'
          value={this.state.firstname}
          onChange={this.handleChange}
          /><br/>

        <label>Lastname</label>
        <input
          name='lastname'
          placeholder='Lastname'
          value={this.state.lastname}
          onChange={this.handleChange}
          /><br/>

        <label>Email</label>
          <input
            name='email'
            placeholder='email id'
            value={this.state.email}
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