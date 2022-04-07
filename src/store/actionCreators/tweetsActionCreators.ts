import * as actions from "../actionTypes/tweetsActionTypes";
import { Tweet } from "../reducers/reducers";

export function likeTweet(
    tweet: Tweet
): actions.LikeTweetAction {
  return {
    type: actions.LIKE_TWEET,
    tweet
  };
}

export function unlikeTweet(
    tweet: Tweet
): actions.UnlikeTweetAction {
    return {
      type: actions.UNLIKE_TWEET,
      tweet
    };
  }

export function clearAllLikes() {
  return {
    type: actions.CLEAR_LIKES
  }
}