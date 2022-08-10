import { RootAction, RootThunkAction } from "@/types/store.d";
import { LoginForm, ApiResponse, Token } from "@/types/data.d";
import request from "@/utils/request";
import { removeToken, setToken } from "@/utils/token";
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

export function sendCode(mobile: string): RootThunkAction {
  return async (dispatch) => {
    // 注意：验证码会发到用户手机上，不需要保存在 redux 中（也不需要保存）
    await request.get(`/sms/codes/${mobile}`);
  };
}

export const logout = (): RootThunkAction => {
  return async (dispatch) => {
    removeToken();

    dispatch({
      type: "login/login",
      payload: {},
    } as RootAction);

    dispatch({
      type: "profile/set_profile",
      payload: {},
    } as RootAction);

    dispatch({
      type: "profile/set_user",
      payload: {},
    } as RootAction);
  };
};
