import { Tweet } from "./tweet-params";

/** user base */
interface UserBase {
  /** user_id */
  id: number;
  /** user_name */
  user_name: string;
  /** profile */
  profile: string;
  /** image */
  image: string;
  /** created_at */
  created_at: Date;
}

/** user information */
interface User extends UserBase {
  /** user tweets */
  tweets: Tweet[];
}

/** user-info response */
interface UserInfo {
  /** user information */
  user: User | null;
}

/** user-list response */
interface UserList {
  /** user list */
  users: UserBase[];
}

/** user-add form */
interface UserAddForm {
  /** user_name */
  user_name: string;
  /** email */
  email: string;
  /** password */
  password: string;
}

/** user-edit form */
interface UserEditForm {
  /** user_name */
  user_name: string;
  /** profile */
  profile: string;
  /** image */
  image: string;
}

/** login form */
interface UserLoginForm {
  /** email */
  email: string;
  /** password */
  password: string;
}

export {
  UserBase,
  User,
  UserInfo,
  UserList,
  UserAddForm,
  UserEditForm,
  UserLoginForm,
}
