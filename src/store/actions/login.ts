import { RootAction, RootThunkAction } from "@/types/store.d";
import { LoginForm, ApiResponse, Token } from "@/types/data.d";
import request from "@/utils/request";
export const login = (values: LoginForm): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.post<ApiResponse<Token>>(
      "/authorizations",
      values
    );
    dispatch({
      type: "login/login",
      payload: res.data.data,
    } as RootAction);
  };
};
