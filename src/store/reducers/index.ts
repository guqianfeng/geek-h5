import { combineReducers } from "redux";
import articleReducer from "./article";
import homeReducer from "./home";
import loginReducer from "./login";
import profileReducer from "./profile";
import searchReducer from "./search";

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  home: homeReducer,
  search: searchReducer,
  article: articleReducer,
});
export default rootReducer;
