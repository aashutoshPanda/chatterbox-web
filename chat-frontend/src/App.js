import React, {Component} from 'react';
import { Provider } from 'react-redux'
import store from './Redux/store'
import RootHome from './rootHome'
import HomePage from './homePage'

class App extends Component {
    render(){
    return(
      <Provider store={store}>
        <RootHome></RootHome>
        {/* <HomePage></HomePage> */}
      </Provider>
    );
  }
}

export default App;
