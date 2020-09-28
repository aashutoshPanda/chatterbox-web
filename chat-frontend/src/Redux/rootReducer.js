import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import allUsersReducer from "./allUsers/allUsersReducer";
import RequestsReducer from "./Requests/ReqReducer";
import FriendsReducer from "./friends/friendsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  allUsers: allUsersReducer,
  Req: RequestsReducer,
  Friends: FriendsReducer,
});

export default rootReducer;
