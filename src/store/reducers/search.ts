import { Suggestion, History } from "@/types/data";
import { RootAction } from "@/types/store";
import { getLocalHistories } from "@/utils/keyword-history";

type SearchState = {
  suggestion: Suggestion;
  history: History;
};
const initialState: SearchState = {
  suggestion: {
    options: [] as string[],
  },
  history: getLocalHistories(),
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
  return state;
};
export default searchReducer;
