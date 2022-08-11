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

export const getAllChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<{ channels: Channel[] }>>(
      "/channels"
    );
    const allChannels = res.data.data.channels;
    dispatch({
      type: "home/set_all_channels",
      payload: allChannels,
    } as RootAction);
  };
};

export const addMyChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    //   if (hasToken()) {
    //     await http.patch(`/user/channels`, {
    //       channels: [
    //         {
    //           id: channel.id,
    //         },
    //       ],
    //     });
    //     dispatch(getUserChennels());
    //   } else {
    //     const localChannels = getLocalChannels();
    //     localChannels.push(channel);
    //     dispatch({
    //       type: "home/set_user_channels",
    //       payload: localChannels,
    //     } as RootAction);
    //   }
    const { userChannels } = getState().home;
    if (hasToken()) {
      await http.patch("/user/channels", {
        channels: [
          {
            id: channel.id,
          },
        ],
      });
    } else {
      setLocalChannels([...userChannels, channel]);
    }
    // dispatch({
    //   type: "home/set_user_channels",
    //   payload: [...userChannels, channel],
    // } as RootAction);
    dispatch(getUserChennels());
  };
};

export const deleteMyChannel = (id: number): RootThunkAction => {
  return async (dispatch) => {
    if (hasToken()) {
      await http.delete(`/user/channels/${id}`);
    } else {
      const userChannels = getLocalChannels();
      const result = userChannels.filter((item) => item.id != id);
      setLocalChannels(result);
    }
    dispatch(getUserChennels());
  };
};
