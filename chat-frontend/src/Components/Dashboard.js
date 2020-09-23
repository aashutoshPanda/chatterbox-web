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

{/* <div class="block">
      <aside class="menu">
        <p class="menu-label">
          Label 1
        </p>
        <ul class="menu-list">
          <li><a href="">Link 1</a></li>
          <li><a href="">Link 1</a></li>
        </ul>
        <p class="menu-label">
          Label 2
        </p>
        <ul class="menu-list">
          <li>
            <a class="is-active" href="">Link 1</a>
            <ul>
              <li><a href="">Link 1</a></li>
              <li><a href="">Link 1</a></li>
              <li><a href="">Link 1</a></li>
            </ul>
          </li>

          <li><a href="">Link 2</a></li>
          <li><a href="">Link 3</a></li>
        </ul>
      </aside>
    </div> */}


    return (
      <div className="container">
        <div className="block"> 
          <h2 className="title is-1">Dashboard</h2>
            <aside className="menu">
            <Router>
            <div>
                <Link className="menu-label" to="/userlist">  <strong class="m-6">UserList</strong>  </Link>
                <Link className="menu-label" to="/requestsent">  <strong class="m-6">Request Sent</strong>  </Link>
                <Link className="menu-label" to="/requestreceived">  <strong class="m-6">Request Received</strong>  </Link>
                <Link className="menu-label" to="/friends">  <strong class="m-6">Friends</strong>  </Link>
                <Switch>
                    <PrivateRoute1 path="/userlist" component={UserList} />
                    <PrivateRoute2 path="/requestsent" component={Request_Sent} />
                    <PrivateRoute3 path="/requestreceived" component={Request_Received} />
                    <PrivateRoute4 path="/friends" component={Friends} />
                </Switch>
            </div>
            </Router>
          </aside>
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
