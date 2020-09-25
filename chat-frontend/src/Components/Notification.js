import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

  handleClick = async event => {
    await this.props.history.push('/bothreq');
  }

  render() {
    return (
        <div>
            {this.props.currentUser && <button  className="button is-primary " onClick={this.handleClick}>Notifications</button>}
        </div>
    )
  }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
    // : () => dispatch(())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
