import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router";
import { Link } from "react-router-dom";

import { createBrowserHistory } from "history";
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
import Profile from "./Components/profile";
import ProfileButton from "./Components/ProfileButton";
import UpdateBio from "./Components/UploadBio";
import UploadImage from "./Components/UploadImage";
import Home from "./Components/Home/Home";
import ProfileOther from "./Components/profileOther";
export const history = createBrowserHistory();

class rootHome extends Component {
  constructor(props) {
    super(props);
    this.navLinks = React.createRef();
    this.state = {};
  }

  componentDidMount = () => {
    if (localStorage.token) this.props.getProfileFetch();
  };

  burgerClick = () => {
    this.navLinks.current.classList.toggle("is-active");
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
    const PrivateRoute5 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/profile",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute6 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/updatebio",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute7 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/uploadImage",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute8 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser === false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute9 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser === false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signup",
              }}
            />
          )
        }
      />
    );
    const PrivateRoute10 = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.currentUser !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/profileOther",
              }}
            />
          )
        }
      />
    );

    return (
      <Router history={history}>
        <nav
          className="navbar has-background-primary-light"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">
              <figure class="image is-32x32">
                <img
                src={require('./chatter-box-logo.png')}
                alt="chatterbox-logo"
                />
              </figure>
            </div>

            <div
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={this.burgerClick}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div
            id="navbarBasicExample"
            className="navbar-menu"
            ref={this.navLinks}
          >
            <div className="navbar-start">
              {this.props.currentUser && (
                <div className="navbar-item">
                  <Link
                    color="primary"
                    onClick={this.burgerClick}
                    to="/dashboard"
                  >
                    <strong>Dashboard</strong>
                  </Link>
                </div>
              )}
              {this.props.currentUser && (
                <div
                  className="navbar-item has-text-link-dark"
                  onClick={this.burgerClick}
                >
                  <ProfileButton></ProfileButton>
                </div>
              )}
              {this.props.currentUser && (
                <div className="navbar-item" onClick={this.burgerClick}>
                  <NewFriend></NewFriend>
                </div>
              )}
              {!this.props.currentUser && (
                <Link className="navbar-item" to="/" onClick={this.burgerClick}>
                  <strong>Home</strong>
                </Link>
              )}
            </div>

            <div className="navbar-end" ref={this.navLinks}>
              <div className="navbar-item">
                <div className="buttons">
                  {!this.props.currentUser && (
                    <Link
                      className="button is-primary"
                      to="/signup"
                      onClick={this.burgerClick}
                    >
                      <strong>Sign up</strong>
                    </Link>
                  )}
                  {!this.props.currentUser && (
                    <Link
                      className="button is-light"
                      to="/login"
                      onClick={this.burgerClick}
                    >
                      <strong>Log in</strong>
                    </Link>
                  )}
                </div>
              </div>
              <div className="navbar-item" onClick={this.burgerClick}>
                <Notification></Notification>
              </div>
              <div className="navbar-item" onClick={this.burgerClick}>
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
          <PrivateRoute5 path="/profile" component={Profile} />
          <PrivateRoute6 path="/updatebio" component={UpdateBio} />
          <PrivateRoute7 path="/uploadImage" component={UploadImage} />
          <PrivateRoute9 path="/signup" component={Signup} />
          <PrivateRoute10 path="/profileOther" component={ProfileOther} />
          <PrivateRoute8 path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
