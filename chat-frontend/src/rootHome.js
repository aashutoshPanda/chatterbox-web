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
        <div>
        <Router>
          <div>
            <nav>
              <ul>
                {<li>
                  <Link to="/">Home</Link>
                </li>}
                {this.props.currentUser && <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>}
                {!this.props.currentUser && <li>
                  <Link to="/login"><button>Login</button></Link>
                </li>}
                {!this.props.currentUser && <li>
                  <Link to="/signup"><button>SignUp</button></Link>
                </li>}
                
              </ul>
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
          </div>
          <br></br>
          <Logout></Logout>
        </Router>
        
        </div>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}


const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
