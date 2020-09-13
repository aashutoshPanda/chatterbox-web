import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from '../Redux';

class Logout extends Component {
  state = {
    
  }

  handleClick = event => {
    event.preventDefault()
    localStorage.removeItem("token")
    this.props.userLogout()
    
  }

  render() {
    return (
        <div>{this.props.currentUser && <button onClick={this.handleClick}>Log Out</button>}</div>
    )
  }
}

const mapStateToProps = state => ({
    currentUser: state.login.currentUser
})

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
