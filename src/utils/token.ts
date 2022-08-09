import { Token } from "@/types/data";

const TOKEN_KEY = "geek-h5-token";

/**
 * 保存 token
 */
export const setToken = (token: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

/**
 * 获取 token
 */
export const getToken = (): Token => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");
};

/**
 * 删除 token
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * 判断是否有 token
 */
export const hasToken = (): boolean => {
  return !!getToken().token;
};
