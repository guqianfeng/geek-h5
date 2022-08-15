import { ApiResponse, ArticleDetail, CommentPage } from "@/types/data";
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

export const getComments = (
  type: "a" | "c",
  source: string,
  offset?: string,
  limit?: number
): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await http.get<ApiResponse<CommentPage>>("/comments", {
      params: {
        type,
        source,
        offset,
        limit: limit || 10,
      },
    });
    const oldCommentPage = getState().article.commentPage;
    const commentPage = res.data.data;
    dispatch({
      type: "article/set_comments",
      payload: {
        ...commentPage,
        results: [...(oldCommentPage.results || []), ...commentPage.results],
      },
    } as RootAction);
  };
};
