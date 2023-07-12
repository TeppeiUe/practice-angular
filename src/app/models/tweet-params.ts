import { UserBase } from "./user-params";

/** tweet base */
interface TweetBase {
  /** tweet_id */
  id: number;
  /** message */
  message: string;
  /** user_id */
  user_id: number;
  /** created_at */
  created_at: Date;
}

/** tweet information */
interface Tweet extends TweetBase {
  /** tweet user information*/
  user: UserBase;
  /** favorite users */
  favorites: UserBase[];
}

/** tweet-info response */
interface TweetInfo {
  /** tweet information */
  tweet: Tweet | null;
}

/** tweet-list response */
interface TweetList {
  /** tweet list */
  tweets: Tweet[] ;
}

/** tweet-add form */
interface TweetAddForm {
  /** message */
  message: string;
}

export {
  TweetBase,
  Tweet,
  TweetInfo,
  TweetList,
  TweetAddForm,
}
