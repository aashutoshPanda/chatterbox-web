import React, {Component} from 'react';
import { Provider } from 'react-redux'
import store from './Redux/store'
import RootHome from './rootHome'
import './App.css'

class App extends Component {
    render(){
    return(
      <Provider store={store}>
        <RootHome></RootHome>
      </Provider>
    );
  }
}

export default App;
