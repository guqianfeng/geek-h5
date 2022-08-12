import { ApiResponse, Suggestion } from "@/types/data";
import { RootAction, RootThunkAction } from "@/types/store";
import http from "@/utils/request";

export const getSearchSuggestion = (q: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<Suggestion>>(`/suggestion`, {
      params: {
        q,
      },
    });
    const suggestion = res.data.data;
    dispatch({
      type: "search/set_suggestion",
      payload: suggestion,
    } as RootAction);
  };
};
