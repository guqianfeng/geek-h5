import { ProfileAction } from "@/types/store.d";
import { User } from "@/types/data";
export type ProfileState = {
  user: User;
};
const initialState: ProfileState = {
  user: {} as User,
};
const profileReducer = (state = initialState, action: ProfileAction) => {
  if (action.type === "profile/set_user") {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
};
export default profileReducer;
