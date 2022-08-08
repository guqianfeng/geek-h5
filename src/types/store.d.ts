import store from "../store";
import { ThunkAction } from "redux-thunk";

export type LoginAction = {
  type: "login/login";
};

export type RootAction = LoginAction;

export type RootState = ReturnType<typeof store.getState>;

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
