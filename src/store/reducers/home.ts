import { Channel } from "@/types/data";
import { RootAction } from "@/types/store";

type HomeState = {
  userChannels: Channel[];
};

const initState: HomeState = {
  userChannels: [],
};

const homeReducer = (state = initState, action: RootAction): HomeState => {
  if (action.type === "home/set_user_channels") {
    return {
      ...state,
      userChannels: action.payload,
    };
  }
  return state;
};
export default homeReducer;
