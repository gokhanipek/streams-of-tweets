import * as actions from "../actionTypes/tweetsActionTypes";

export interface Tweet {
  account?: string;
  content?: string;
  timestamp?: number;
}

interface TweetsState {
  likes: Array<Tweet>;
}

const initialState: TweetsState = {
    likes: [],
};  
export default function tweetsReducer(state = initialState, action: actions.TweetsAction) {
    switch(action.type) {
      case actions.LIKE_TWEET:
        return {
          ...state, 
          likes: [
            ...state.likes,
              action.tweet
        ]
      };
      case actions.UNLIKE_TWEET:
        return {
          ...state,
          likes: state.likes.filter(item => {
              if(item.timestamp === action.tweet.timestamp) {
                return item.account !== action.tweet.account
              }
              return state
            }
          )
        };
      case actions.CLEAR_LIKES:
        return {
          ...state,
          likes: []
        }        
      default:
        return state;
    }
  } 