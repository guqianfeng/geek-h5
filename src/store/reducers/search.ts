import { Suggestion, History, SearchResult } from "@/types/data";
import { RootAction } from "@/types/store";
import { getLocalHistories } from "@/utils/keyword-history";

type SearchState = {
  suggestion: Suggestion;
  history: History;
  searchResult: SearchResult;
};
const initialState: SearchState = {
  suggestion: {
    options: [] as string[],
  },
  history: getLocalHistories(),
  searchResult: {} as SearchResult,
};
const searchReducer = (state = initialState, action: RootAction) => {
  if (action.type === "search/set_suggestion") {
    return {
      ...state,
      suggestion: action.payload,
    };
  }
  if (action.type === "search/set_history") {
    return {
      ...state,
      history: action.payload,
    };
  }
  if (action.type === "search/set_search_result") {
    return {
      ...state,
      searchResult: action.payload,
    };
  }
  return state;
};
export default searchReducer;
