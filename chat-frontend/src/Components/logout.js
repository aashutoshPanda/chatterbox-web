import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from '../Redux';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

  handleClick = async event => {
    await event.preventDefault()
    await localStorage.removeItem("token")
    await this.props.userLogout()
    await this.props.history.push('/');
  }

  render() {
    // console.log(this.props.currentUser)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
