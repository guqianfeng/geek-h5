import { combineReducers } from "redux";
import loginReducer from "./login";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
});
export default rootReducer;
