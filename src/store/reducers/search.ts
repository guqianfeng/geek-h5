import { Suggestion } from "@/types/data";
import { RootAction } from "@/types/store";

type SearchState = {
  suggestion: Suggestion;
};
const initialState: SearchState = {
  suggestion: {
    options: [] as string[],
  },
};
const searchReducer = (state = initialState, action: RootAction) => {
  if (action.type === "search/set_suggestion") {
    return {
      ...state,
      suggestion: action.payload,
    };
  }
  return state;
};
export default searchReducer;
