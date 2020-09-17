import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import allUsersReducer from './allUsers/allUsersReducer'


const rootReducer = combineReducers({
  auth:authReducer,
  allUsers:allUsersReducer
})

export default rootReducer