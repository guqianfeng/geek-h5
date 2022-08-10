import { ApiResponse, Token } from "@/types/data";
import axios, { AxiosError } from "axios";
import { Toast } from "antd-mobile";
import { getToken, removeToken, setToken } from "./token";
import store from "@/store";
import { RootAction } from "@/types/store";
import history from "@/router";

const baseURL = "http://geek.itheima.net/v1_0/";
const http = axios.create({
  baseURL,
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken().token;
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    // 无响应的情况
    if (!error.response) {
      Toast.show("服务器繁忙，请稍后再试");
      return Promise.reject(error);
    }

    // 处理刷新token的逻辑
    if (error.response.status === 401) {
      const { token, refresh_token: refreshToken } = getToken();

      if (token && refreshToken) {
        try {
          // 有token的情况
          // console.log(refreshToken);
          const res = await axios.put<ApiResponse<Token>>(
            `${baseURL}authorizations`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          const newToken: Token = {
            token: res.data.data.token,
            refresh_token: refreshToken,
          };
          setToken(newToken);
          store.dispatch({
            type: "login/login",
            payload: newToken,
          } as RootAction);
          return http(error.response.config);
        } catch (e) {
          history.push("/login");
          removeToken();
          store.dispatch({
            type: "login/login",
            payload: {},
          } as RootAction);
        }
      } else {
        // 没有token直接跳转首页
        history.push("/login");
      }
    }

    // 有响应，并返回错误信息的情况
    Toast.show(error.response.data.message);

    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
