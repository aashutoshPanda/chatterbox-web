import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from '../Redux';


class Logout extends Component {

  handleSubmit = event => {
    event.preventDefault()
    this.props.userLogout()
  }

  handleClick = event => {
    event.preventDefault()
    localStorage.removeItem("token")
    this.props.logoutUser()
  }

  render() {
    return (
        <div>
            {this.props.currentUser && <button onClick={this.handleClick}>Log Out</button>}
        </div>
    )
  }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
    userLogout: userInfo => dispatch(userLogout(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout);