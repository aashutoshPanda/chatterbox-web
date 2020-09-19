import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import allUsersReducer from './allUsers/allUsersReducer'
import sentRequests from './ReqSent/ReqSentReducer'
import receivedRequests from './ReqReceived/ReqReceivedReducer'


const rootReducer = combineReducers({
  auth:authReducer,
  allUsers:allUsersReducer,
  sentReq:sentRequests,
  receivedReq:receivedRequests
})

export default rootReducer
