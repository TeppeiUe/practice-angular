export interface TweetList {
  tweets: Tweet[] | [];
}

export interface TweetInfo {
  tweet: Tweet | null;
}


export interface Tweet {
  id: number;
  message: string;
  user_name: string;
  user_id: number;
  created_at: Date;
}