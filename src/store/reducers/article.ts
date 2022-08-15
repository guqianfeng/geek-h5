import { ArticleDetail, CommentPage } from "@/types/data";
import { RootAction } from "@/types/store";

type ArticleState = {
  articleDetail: ArticleDetail;
  commentPage: CommentPage;
};

const initialState: ArticleState = {
  articleDetail: {} as ArticleDetail,
  commentPage: {} as CommentPage,
};

const articleReducer = (state = initialState, action: RootAction) => {
  if (action.type === "article/set_detail") {
    return {
      ...state,
      articleDetail: action.payload,
    };
  }
  if (action.type === "article/set_comments") {
    return {
      ...state,
      commentPage: action.payload,
    };
  }
  return state;
};
export default articleReducer;
