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
import UserList from './UserList'

class Dashboard extends Component {

  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.currentUser !== false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/userlist',
                state: { from: props.location }
              }} />
        )} />
      )

    return (
        <div>
            <h2>Dashboard</h2>
            <Router>
            <div>
                <Link to="/userlist">UserList</Link>

                <Switch>
                    <PrivateRoute path="/userlist" component={UserList} />
                </Switch>
            </div>
            </Router>
        
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
