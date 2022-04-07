import { combineReducers } from "redux";
import tweetsReducer from "./reducers";

const rootReducer = combineReducers({
  tweets: tweetsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
