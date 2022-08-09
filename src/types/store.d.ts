import store from "@/store";
import { ThunkAction } from "redux-thunk";
import { Token } from "@/data";

export type LoginAction = {
  type: "login/login";
  payload: Token;
};

export type RootAction = LoginAction;

export type RootState = ReturnType<typeof store.getState>;

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
