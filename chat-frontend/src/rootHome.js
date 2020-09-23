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
      <div class="block">
        
      <nav class="nav">
        <div class="nav-left">
          <div class="nav-item">
            <h1 class="title is-5"><Link to="/">Home</Link></h1>
          </div>
        </div>

        <div class="nav-right nav-menu">
        {this.props.currentUser && 
        <div class="nav-item">
          <Link class="title is-5" to="/dashboard">Dashboard</Link>
        </div>}
        {!this.props.currentUser && 
        <div class="nav-item">
          <Link to="/login"><button class="button is-primary is-outlined is-small">Login</button></Link>
        </div>}
        {!this.props.currentUser && 
        <div class="nav-item">
          <Link to="/signup"><button class="button is-primary is-outlined is-small">SignUp</button></Link>
        </div>}
        <div class="nav-item">
          <Logout></Logout>
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
      
    </div>
    </Router>
    );
  }
}

function Home() {
  return <h2 class="title is-1">Home</h2>;
}


const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
