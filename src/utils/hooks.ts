import { RootState } from "@/types/store";
import { RootThunkAction } from "@/types/store.d";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export const usePageEnter = (action: () => RootThunkAction) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action());
  }, [dispatch, action]);
  const state = useSelector<RootState, RootState>((state) => state);
  return state;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};
