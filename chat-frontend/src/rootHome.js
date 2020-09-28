import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./Components/Signup";
import Login from "./Components/login";
import Logout from "./Components/logout";
import { getProfileFetch } from "./Redux";
import Dashboard from "./Components/Dashboard";
import Notification from "./Components/Notification";
import NewFriend from "./Components/NewFriend";
import UserList from "./Components/UserList";
import BothReq from "./Components/BothReq";
import Friends from "./Components/Friends";

class rootHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (localStorage.token) this.props.getProfileFetch();
  };

  render() {
    const PrivateRoute1 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/dashboard",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute2 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/userlist",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute3 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/bothreq",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute4 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/friends",
              }}
            />
          )
        }
      />
    );

    return (
      <Router>
        <nav className="navbar has-background-primary-light" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="bulma"
                width="112"
                height="28"
              ></img>
            </a>

            <div
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              {/* <Link className="navbar-item" to="/">Home</Link> */}

              {this.props.currentUser && (
                <Link className="navbar-item" to="/dashboard">
                  Dashboard
                </Link>
              )}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {!this.props.currentUser && (
                    <Link className="button is-primary is-active" to="/signup">
                      <strong>Sign up</strong>
                    </Link>
                  )}
                  {!this.props.currentUser && (
                    <Link className="button is-light is-active" to="/login">
                      <strong>Log in</strong>
                    </Link>
                  )}
                </div>
              </div>
              <div className="navbar-item">
                <Notification></Notification>
              </div>
              <div className="navbar-item">
                <NewFriend></NewFriend>
              </div>
              <div className="navbar-item">
                <Logout></Logout>
              </div>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute1 path="/dashboard" component={Dashboard} />
          <PrivateRoute2 path="/userlist" component={UserList} />
          <PrivateRoute3 path="/bothreq" component={BothReq} />
          <PrivateRoute4 path="/friends" component={Friends} />
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function Home() {
  return (
    <div className="container">
      <div className="block centerall">
        <h1 className="title">Welcome to XYZ-chat</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
