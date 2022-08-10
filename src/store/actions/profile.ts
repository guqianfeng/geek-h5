import { UserAction, ProfileAction } from "@/types/store.d";
import { ApiResponse, User, Profile } from "@/types/data";
import { RootThunkAction } from "@/types/store.d";
import request from "@/utils/request";
export const getUser = (): RootThunkAction => {
  return async (dispatch) => {
    //
    const res = await request.get<ApiResponse<User>>("/user");

    const user = res.data.data;
    // console.log(user);
    dispatch({
      type: "profile/set_user",
      payload: user,
    } as UserAction);
  };
};

export const getProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<Profile>>("/user/profile");
    // console.log(res);
    const profile = res.data.data;
    // console.log(profile);
    dispatch({
      type: "profile/set_profile",
      payload: profile,
    } as ProfileAction);
  };
};

export const updateProfile = (data: Partial<Profile>): RootThunkAction => {
  return async (disapth) => {
    await request.patch("/user/profile", data);
    disapth(getProfile());
  };
};

export const updateProfilePhoto = (data: FormData): RootThunkAction => {
  return async (dispatch) => {
    await request.patch("/user/photo", data);
    dispatch(getProfile());
  };
};
