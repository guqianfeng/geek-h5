import { RootAction } from "@/types/store.d";
import { Profile, User } from "@/types/data";
export type ProfileState = {
  user: User;
  profile: Profile;
};
const initialState: ProfileState = {
  user: {} as User,
  profile: {} as Profile,
};
const profileReducer = (state = initialState, action: RootAction) => {
  if (action.type === "profile/set_user") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "profile/set_profile") {
    return {
      ...state,
      profile: action.payload,
    };
  }
  return state;
};
export default profileReducer;
