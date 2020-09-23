import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {connect} from 'react-redux';
import Signup from './Components/Signup'
import Login from './Components/login'
import Logout from './Components/logout'
import {getProfileFetch} from './Redux';
import Dashboard from './Components/Dashboard'

class rootHome extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      
     }
    
  }

  componentDidMount = () => {
    if(localStorage.token) this.props.getProfileFetch()
  }


  render(){

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.currentUser !== false
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
      )} />
    )
    
    return(
      <Router>
        <nav className="navbar " role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">Home</Link>

              {this.props.currentUser && 
                  <Link className="navbar-item" to="/dashboard">Dashboard</Link>
                }
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  
                {!this.props.currentUser && <Link className="button is-primary" to="/signup">
                    <strong>Sign up</strong>
                </Link>}
                {!this.props.currentUser && <Link className="button is-light" to="/login">
                    <strong>Log in</strong>
                </Link>}
                </div>
              </div>
              <div className="navbar-item"><Logout></Logout></div>
            </div>
          </div>
        </nav>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} />
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
  return <h2 className="title is-1">Home</h2>;
}


const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
