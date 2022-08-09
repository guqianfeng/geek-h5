import { User, Token, Profile } from "./data.d";
import store from "@/store";
import { ThunkAction } from "redux-thunk";

export type LoginAction = {
  type: "login/login";
  payload: Token;
};

export type UserAction = {
  type: "profile/set_user";
  payload: User;
};

export type ProfileAction = {
  type: "profile/set_profile";
  payload: Profile;
};

// 所有 Action 汇总成的类型
export type RootAction = LoginAction | UserAction | ProfileAction;

export type RootState = ReturnType<typeof store.getState>;

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
