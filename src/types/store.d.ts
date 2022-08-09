import store from "@/store";
import { ThunkAction } from "redux-thunk";
import { Token } from "@/data";

export type LoginAction = {
  type: "login/login";
  payload: Token;
};

export type SendCodeAction = {
  type: "login/code";
  payload: string;
};

export type RootAction = LoginAction | SendCodeAction;

export type RootState = ReturnType<typeof store.getState>;

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
