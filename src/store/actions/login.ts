import { RootThunkAction } from "@/types/store.d";
import { LoginForm } from "@/types/data.d";
import request from "@/utils/request";
export const login = (values: LoginForm): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", values);
    console.log(res);
  };
};
