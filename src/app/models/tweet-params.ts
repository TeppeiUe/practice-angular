import { User } from "./user-params";

/** basic response for getting tweet list */
export interface TweetList {
  tweets: Tweet[] ;
}

/** basic response for getting tweet information */
export interface TweetInfo {
  tweet: Tweet | null;
}

/** tweet information */
export interface Tweet {
  id: number;
  message: string;
  user_id: number;
  created_at: Date;
  user?: User;
  favorites?: User[] ;
}