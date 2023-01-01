import { Tweet } from "./tweet-params";

/** basic response for getting user information */
export interface UserInfo {
  user: User | null;
}

/** basic response for getting user list */
export interface UserList {
  users: User[] ;
}

/** user information */
export interface User {
  id: number;
  user_name: string;
  profile: string;
  image: string;
  created_at?: Date;
  tweets?: Tweet[] ;
}

/** user-edit form */
export interface UserPut {
  user_name: string;
  profile: string;
  image: string;
}

/** login form */
export interface UserAuth {
  email: string;
  password: string;
}