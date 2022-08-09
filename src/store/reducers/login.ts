import { Token } from "@/types/data.d";
import { RootAction } from "@/types/store";
import { getToken } from "@/utils/token";
const initialState: Token = getToken();
function loginReducer(state = initialState, action: RootAction) {
  if (action.type === "login/login") {
    return action.payload;
  }
  return state;
}
export default loginReducer;
