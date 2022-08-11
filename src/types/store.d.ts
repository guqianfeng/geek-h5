import { User, Token, Profile, Channel } from "./data.d";
import store from "@/store";
import { ThunkAction } from "redux-thunk";

export type LoginSetTokenAction = {
  type: "login/set_token";
  payload: Token;
};

export type ProfileSetUserAction = {
  type: "profile/set_user";
  payload: User;
};

export type ProfileSetProfileAction = {
  type: "profile/set_profile";
  payload: Profile;
};

export type HomeSetUserChannelsAction = {
  type: "home/set_user_channels";
  payload: Channel[];
};

// 所有 Action 汇总成的类型
export type RootAction =
  | LoginSetTokenAction
  | ProfileSetUserAction
  | ProfileSetProfileAction
  | HomeSetUserChannelsAction;

export type RootState = ReturnType<typeof store.getState>;

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
