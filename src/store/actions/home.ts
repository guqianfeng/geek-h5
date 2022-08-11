import { ApiResponse, Channel } from "@/types/data";
import { RootAction, RootThunkAction } from "@/types/store";
import { getLocalChannels, setLocalChannels } from "@/utils/channel";
import http from "@/utils/request";
import { hasToken } from "@/utils/token";

export const getUserChennels = (): RootThunkAction => {
  return async (dispatch) => {
    const requestChannelsData = async () => {
      const res = await http.get<ApiResponse<{ channels: Channel[] }>>(
        "/user/channels"
      );
      const channels = res.data.data.channels;
      return channels;
    };
    let channels: Channel[] = [];
    if (hasToken()) {
      channels = await requestChannelsData();
    } else {
      channels = getLocalChannels();
      if (channels.length === 0) {
        // 重新发送请求
        channels = await requestChannelsData();
        setLocalChannels(channels);
      }
    }
    dispatch({
      type: "home/set_user_channels",
      payload: channels,
    } as RootAction);
  };
};
