import { Tweet } from "./tweet-params";

export interface UserInfo {
  user: User | null;
}

export interface UserList {
  users: User[] | [];
}

export interface User {
  id: number;
  user_name: string;
  profile?: string;
  image?: string;
  created_at?: Date;
  tweets?: Tweet[] | [];
}

export interface UserPut {
  user_name: string;
  profile: string;
  image: string;
}