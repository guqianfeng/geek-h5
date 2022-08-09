import { ApiResponse } from "@/types/data";
import axios, { AxiosError } from "axios";
import { Toast } from "antd-mobile";
import { getToken } from "./token";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0/",
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
  (error: AxiosError<ApiResponse>) => {
    // 无响应的情况
    if (!error.response) {
      Toast.show("服务器繁忙，请稍后再试");
      return Promise.reject(error);
    }

    // 有响应，并返回错误信息的情况
    Toast.show(error.response.data.message);

    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
