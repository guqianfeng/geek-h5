import { ApiResponse, User } from "@/types/data";
import { RootThunkAction } from "@/types/store.d";
import request from "@/utils/request";
export const getProfile = (): RootThunkAction => {
  return async (dispatch) => {
    //
    const res = await request.get<ApiResponse<User>>("/user");

    const user = res.data.data;
    console.log(user);
  };
};
