import { User, Token } from "./data.d";
import store from "@/store";
import { ThunkAction } from "redux-thunk";

export type LoginAction = {
  type: "login/login";
  payload: Token;
};

export type SendCodeAction = {
  type: "login/code";
  payload: string;
};

export type ProfileAction = {
  type: "profile/set_user";
  payload: User;
};

// 所有 Action 汇总成的类型
export type RootAction = LoginAction | SendCodeAction | ProfileAction;

export type RootState = ReturnType<typeof store.getState>;

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
