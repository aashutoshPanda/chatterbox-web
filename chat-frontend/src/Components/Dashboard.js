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

class Dashboard extends Component {

  render() {

    const PrivateRoute1 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/userlist',
                state: { from: props.location }
              }} />
        )} />
      )

      const PrivateRoute2 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/requestsent',
                state: { from: props.location }
              }} />
        )} />
      )

      const PrivateRoute3 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/requestreceived',
                state: { from: props.location }
              }} />
        )} />
      )

      const PrivateRoute4 = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/friends',
                state: { from: props.location }
              }} />
        )} />
      )
    return (
      <div class="container">
        <div class="block"> 
            <h2 class="title is-3">Dashboard</h2>
            <Router>
            <div>
                <Link to="/userlist">UserList</Link>
                <br></br>
                <Link to="/requestsent">Request Sent</Link>
                <br></br>
                <Link to="/requestreceived">Request Received</Link>
                <br></br>
                <Link to="/friends">Friends</Link>
                <br></br>
                <br></br>
                <br></br>
                <Switch>
                    <PrivateRoute1 path="/userlist" component={UserList} />
                    <PrivateRoute2 path="/requestsent" component={Request_Sent} />
                    <PrivateRoute3 path="/requestreceived" component={Request_Received} />
                    <PrivateRoute4 path="/friends" component={Friends} />
                </Switch>
            </div>
            </Router>
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
