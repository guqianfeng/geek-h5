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
