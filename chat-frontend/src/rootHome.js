import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {connect} from 'react-redux';
import Signup from './Components/Signup'
import Login from './Components/login'
import Logout from './Components/logout'
import {getProfileFetch} from './Redux';

class rootHome extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      
     }
    
  }

  componentDidMount = () => {
    this.props.getProfileFetch()
  }

  

  render(){

    console.log(this.props)
    return(
        <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                { <li>
                  <Link to="/login"><button>Login</button></Link>
                </li>}
                {<li>
                  <Link to="/signup"><button>SignUp</button></Link>
                </li>}
                
              </ul>
            </nav>

            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/signup">
                <Signup changeState={this.changeState} />
              </Route>
              
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
            <Logout></Logout>
            
          </div>
        </Router>
        </div>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}



const mapStateToProps = state => ({
    currentUser: state.login.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
