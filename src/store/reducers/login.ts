import { Token } from "@/types/data.d";
import { RootAction } from "@/types/store";
const initialState: Token = {
  token: "",
  refresh_token: "",
};
function loginReducer(state = initialState, action: RootAction) {
  if (action.type === "login/login") {
    return action.payload;
  }
  return state;
}
export default loginReducer;
