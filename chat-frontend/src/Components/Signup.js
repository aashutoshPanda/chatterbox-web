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
      <div className="container">
        <div className="block">   
          <form onSubmit={this.handleSubmit}>

            <h1 className="title">Sign Up For An Account</h1>

            <div className="field">
            <label className="label">Username</label>
            <input
              type="text" 
              className="input"
              name='username'
              placeholder='Username'
              value={this.state.firstname}
              onChange={this.handleChange}
              /><br/>
            </div>

            <div className="field">
            <label className="label">Firstname</label>
            <input
              type="text" 
              className="input"
              name='first_name'
              placeholder='Firstname'
              value={this.state.firstname}
              onChange={this.handleChange}
              /><br/>
            </div>

            <div className="field">
            <label className="label">Lastname</label>
            <input
              type="text" 
              className="input"
              name='last_name'
              placeholder='Lastname'
              value={this.state.lastname}
              onChange={this.handleChange}
              /><br/>
            </div>

            <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleChange}
              /><br/>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary">Submit</button>
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