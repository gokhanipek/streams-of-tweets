import { Tweet } from "../reducers/reducers";

export const LIKE_TWEET = "LIKE_TWEET";
export interface LikeTweetAction {
  type: typeof LIKE_TWEET;
  tweet: Tweet;
}

export const UNLIKE_TWEET = "UNLIKE_TWEET";
export interface UnlikeTweetAction {
  type: typeof UNLIKE_TWEET;
  tweet: Tweet;
}

export const CLEAR_LIKES = "CLEAR_LIKES";
export interface ClearLikes {
  type: typeof CLEAR_LIKES
}

export type TweetsAction =
  | LikeTweetAction
  | UnlikeTweetAction
  | ClearLikes;