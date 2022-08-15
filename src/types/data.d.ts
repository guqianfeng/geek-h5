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

export interface ArticlePage {
  results: Article[];
  pre_timestamp: string;
}

export interface Article {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number;
  cover: Cover;
}

export interface Cover {
  type: 0 | 1 | 3;
  images?: string[];
}
export interface Suggestion {
  options: string[];
}

export type History = string[];

export interface SearchResult {
  page: number;
  per_page: number;
  results: SearchItem[];
  total_count: number;
}

export interface SearchItem {
  art_id: string;
  title: string;
  aut_id: string;
  aut_name: string;
  comm_count: number;
  pubdate: string;
  cover: Cover;
  like_count: number;
  collect_count: number;
}
export interface ArticleDetail {
  art_id: string;
  title: string;
  pubdate: string;
  aut_id: string;
  content: string;
  aut_name: string;
  aut_photo: string;
  is_followed: boolean;
  is_collected: boolean;
  attitude: number;
  comm_count: number;
  read_count: number;
  like_count: number;
}
export interface CommentPage {
  total_count: number;
  end_id: string;
  last_id: string;
  results: Comment[];
}

export interface Comment {
  com_id: string;
  content: string;
  reply_count: number;
  pubdate: string;
  is_followed: boolean;
  is_liking: boolean;
  like_count: number;
  aut_id: string;
  aut_name: string;
  aut_photo: string;
}
