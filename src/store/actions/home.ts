import { ApiResponse, Channel } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import http from "@/utils/request";

export const getUserChennels = (): RootThunkAction => {
  return async (dispatch) => {
    // 1.
    const res = await http.get<ApiResponse<{ channels: Channel[] }>>(
      "/user/channels"
    );
    const channels = res.data.data.channels;
    console.log(channels);
  };
};
