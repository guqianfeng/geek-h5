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

export const articleLikingHandler = (
  target: string,
  attitude: number
): RootThunkAction => {
  return async (dispatch) => {
    if (attitude === 1) {
      // 取消点赞
      await http.delete(`/article/likings/${target}`);
    } else {
      // 点赞
      await http.post(`/article/likings`, {
        target,
      });
    }
    dispatch(getArticleDetil(target));
  };
};

export const articleCollectedHandler = (
  target: string,
  collected: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (collected) {
      // 已收藏 调用取消收藏接口
      await http.delete(`/article/collections/${target}`);
    } else {
      // 未收藏 调用收藏接口
      await http.post(`/article/collections`, {
        target,
      });
    }
    dispatch(getArticleDetil(target));
  };
};

export const articleUserFollowingHandler = (
  target: string,
  followed: boolean,
  artId: string
): RootThunkAction => {
  return async (dispatch) => {
    if (followed) {
      // 调用取消关注
      await http.delete(`/user/followings/${target}`);
    } else {
      // 调用关注
      await http.post("/user/followings", {
        target,
      });
    }
    dispatch(getArticleDetil(artId));
  };
};
