import { ApiResponse, ArticleDetail } from "@/types/data";
import { RootAction, RootThunkAction } from "@/types/store";
import http from "@/utils/request";

export const getArticleDetil = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<ArticleDetail>>(`/articles/${id}`);
    const articleDetail = res.data.data;
    dispatch({
      type: "article/set_detail",
      payload: articleDetail,
    } as RootAction);
  };
};
