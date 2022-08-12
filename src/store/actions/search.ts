import { ApiResponse, Suggestion } from "@/types/data";
import { RootAction, RootThunkAction } from "@/types/store";
import { setLocalHistories } from "@/utils/keyword-history";
import http from "@/utils/request";

export const getSearchSuggestion = (q: string): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await http.get<ApiResponse<Suggestion>>(`/suggestion`, {
      params: {
        q,
      },
    });
    const suggestion = res.data.data;
    // old history
    const oldHistory = getState().search.history;
    const newHistory = [q, ...oldHistory];
    // 去重
    const set = new Set(newHistory);
    // 限制10个
    const resultArr = Array.from(set).slice(0, 10);
    // 存入本地缓存
    setLocalHistories(resultArr);
    dispatch({
      type: "search/set_suggestion",
      payload: suggestion,
    } as RootAction);
    dispatch({
      type: "search/set_history",
      payload: resultArr,
    } as RootAction);
  };
};
