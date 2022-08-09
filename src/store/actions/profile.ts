import { ProfileAction } from "@/types/store.d";
import { ApiResponse, User } from "@/types/data";
import { RootThunkAction } from "@/types/store.d";
import request from "@/utils/request";
export const getProfile = (): RootThunkAction => {
  return async (dispatch) => {
    //
    const res = await request.get<ApiResponse<User>>("/user");

    const user = res.data.data;
    // console.log(user);
    dispatch({
      type: "profile/set_user",
      payload: user,
    } as ProfileAction);
  };
};
