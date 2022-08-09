import { RootAction, RootThunkAction } from "@/types/store.d";
import { LoginForm, ApiResponse, Token } from "@/types/data.d";
import request from "@/utils/request";
import { setToken } from "@/utils/token";
export const login = (values: LoginForm): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.post<ApiResponse<Token>>(
      "/authorizations",
      values
    );
    const token = res.data.data;
    dispatch({
      type: "login/login",
      payload: token,
    } as RootAction);
    setToken(token);
  };
};
