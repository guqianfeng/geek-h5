export type LoginForm = {
  mobile: string;
  code: string;
};
export type ApiResponse<T = any> = {
  message: string;
  data: T;
};
export type Token = {
  token: string;
  refresh_token: string;
};
// 用户信息
export type User = {
  id: string;
  name: string;
  photo: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
};
