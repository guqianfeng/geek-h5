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
export interface Profile {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: number;
  birthday: string;
  intro?: any;
}
export type Message = {
  type: "robot" | "user";
  text: string;
};

export type Channel = {
  id: number;
  name: string;
};
