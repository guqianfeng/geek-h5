import { combineReducers } from "redux";
import homeReducer from "./home";
import loginReducer from "./login";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  home: homeReducer,
});
export default rootReducer;
