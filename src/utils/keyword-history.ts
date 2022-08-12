import { History } from "@/types/data";
// 搜索关键字的本地缓存键名
const SEARCH_HISTORY_KEY = "geek-search-history";

/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): History => {
  return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || "[]");
};

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories
 */
export const setLocalHistories = (histories: History): void => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(histories));
};

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
};
