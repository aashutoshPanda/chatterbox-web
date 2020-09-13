import React, {Component} from 'react';
import {
  BrowserRouter as Router, 
  Link,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import {connect} from 'react-redux';
import Signup from './Components/Signup'
import Login from './Components/login'
import {getProfileFetch} from './Redux';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

const Public = () => <h3>This is Home Page</h3>
const Protected = () => <h3>This is your Dashboard</h3>

class Loginin extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const AuthButton = withRouter(({ history }) => {
  return(
  fakeAuth.isAuthenticated
    ? <p>
        Welcome! <button onClick={() => {
          fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
      </p>
    : <p>not logged in</p>
  )}
)

const PrivateRoute = ({ component: Component, ...rest }) => {
  return(
    <Route {...rest} render={(props) => (
      fakeAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
}

class rootHome extends Component {
  componentDidMount = () => {
    console.log(this.props)
    this.props.getProfileFetch()
  }

  handleClick = event => {
    event.preventDefault()
    localStorage.removeItem("token")
    this.props.logoutUser()
  }

  render(){
    
    return (
      <Router>
        <div>
          <AuthButton />
  
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/protected">Protected Page</Link></li>
          </ul>
          
          <Route exact path="/" component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path='/protected' component={Protected} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(rootHome);
