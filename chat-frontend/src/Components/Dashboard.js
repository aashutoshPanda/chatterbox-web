import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {connect} from 'react-redux';
import {userLogout} from '../Redux';
import { withRouter } from 'react-router-dom';
import UserList from './UserList';
import Request_Sent from './RequestSent';
import Request_Received from './RequestReceived';
import Friends from './Friends';
import ChatComponent from './ChatComponent'
import Users from './Users'

class Dashboard extends Component {

  render() {

    const PrivateRoute1 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/userlist',
                // state: { from: props.location }
              }} />
        )} />
      )

      const PrivateRoute2 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/requestsent',
                // state: { from: props.location }
              }} />
        )} />
      )

      const PrivateRoute3 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/requestreceived',
                // state: { from: props.location }
              }} />
        )} />
      )

      const PrivateRoute4 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/friends',
                // state: { from: props.location }
              }} />
        )} />
      )



    return (
      <div className="container">
        <div className="block"> 
          <h2 className="title is-1">Dashboard</h2>
          <div className="columns">
            <div className="column is-5">
              <Users></Users>
            </div>
            <div className="column is-7">
              <ChatComponent></ChatComponent>
            </div>
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
