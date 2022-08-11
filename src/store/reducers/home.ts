import { Channel } from "@/types/data";
import { RootAction } from "@/types/store";

type HomeState = {
  userChannels: Channel[];
  allChannels: Channel[];
};

const initState: HomeState = {
  userChannels: [],
  allChannels: [],
};

const homeReducer = (state = initState, action: RootAction): HomeState => {
  if (action.type === "home/set_user_channels") {
    return {
      ...state,
      userChannels: action.payload,
    };
  }
  if (action.type === "home/set_all_channels") {
    return {
      ...state,
      allChannels: action.payload,
    };
  }
  return state;
};
export default homeReducer;
