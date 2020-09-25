import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

  handleClick = async event => {
    await this.props.history.push('/userlist');
  }

  render() {
    // console.log(this.props.currentUser) button class="button is-primary is-outlined is-small">
    return (
        <div>
            {this.props.currentUser && <button  className="button is-primary " onClick={this.handleClick}>New Friend</button>}
            
        </div>
    )
  }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
    // userLogout: userInfo => dispatch(userLogout(userInfo))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
