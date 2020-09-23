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
      <div className="block">
        
      <nav className="nav">
        <div className="nav-left">
          <div className="nav-item">
            <h1 className="title is-5"><Link to="/">Home</Link></h1>
          </div>
        </div>

        <div className="nav-right nav-menu">
        {this.props.currentUser && 
        <div className="nav-item">
          <Link className="title is-5" to="/dashboard">Dashboard</Link>
        </div>}
        {!this.props.currentUser && 
        <div className="nav-item">
          <Link to="/login"><button className="button is-primary is-outlined is-small">Login</button></Link>
        </div>}
        {!this.props.currentUser && 
        <div className="nav-item">
          <Link to="/signup"><button className="button is-primary is-outlined is-small">SignUp</button></Link>
        </div>}
        <div className="nav-item">
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
  return <h2 className="title is-1">Home</h2>;
}


const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
