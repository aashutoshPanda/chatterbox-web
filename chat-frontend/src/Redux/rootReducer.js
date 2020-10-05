import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import allUsersReducer from "./allUsers/allUsersReducer";
import RequestsReducer from "./Requests/ReqReducer";
import FriendsReducer from "./friends/friendsReducer";
import OtherUserReducer from "./OtherUser/OtherUserReducer";

const appReducer = combineReducers({
  auth: authReducer,
  allUsers: allUsersReducer,
  Req: RequestsReducer,
  Friends: FriendsReducer,
  OtherUser: OtherUserReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
