import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import allUsersReducer from "./allUsers/allUsersReducer";
import RequestsReducer from "./Requests/ReqReducer";
import FriendsReducer from "./friends/friendsReducer";
import OtherUserReducer from "./OtherUser/OtherUserReducer";
import OtherProfileReducer from "./OtherProfile/OtherProfileReducer"

const appReducer = combineReducers({
  auth: authReducer,
  allUsers: allUsersReducer,
  Req: RequestsReducer,
  Friends: FriendsReducer,
  OtherUser: OtherUserReducer,
  OtherProfile: OtherProfileReducer
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
