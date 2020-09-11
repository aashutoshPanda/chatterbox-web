import { combineReducers } from 'redux'
import loginReducer from './Login/LoginReducer'
import logoutReducer from './Logout/logoutReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer
})

export default rootReducer