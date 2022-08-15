import { ArticleDetail } from "@/types/data";
import { RootAction } from "@/types/store";

type ArticleState = {
  articleDetail: ArticleDetail;
};

const initialState: ArticleState = {
  articleDetail: {} as ArticleDetail,
};

const articleReducer = (state = initialState, action: RootAction) => {
  if (action.type === "article/set_detail") {
    return {
      ...state,
      articleDetail: action.payload,
    };
  }
  return state;
};
export default articleReducer;
