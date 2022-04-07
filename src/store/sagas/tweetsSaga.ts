import { put, takeEvery, all } from "redux-saga/effects";

import * as actionCreators from "../actionCreators/tweetsActionCreators";
import * as actionTypes from "../actionTypes/tweetsActionTypes";

function* likeTweet(action: actionTypes.LikeTweetAction) {
    console.warn(action);
    yield put(actionCreators.likeTweet(action.tweet));
}

function* unlikeTweet(action: actionTypes.UnlikeTweetAction) {
    yield put(actionCreators.unlikeTweet(action.tweet));
}

function* clearLikes(action: actionTypes.ClearLikes) {
    yield put(actionCreators.clearAllLikes())
}

export default function* tweetsSaga() {
  yield all([
        takeEvery(actionTypes.LIKE_TWEET, unlikeTweet),
        takeEvery(actionTypes.UNLIKE_TWEET, likeTweet),
        takeEvery(actionTypes.CLEAR_LIKES, clearLikes)        
    ]);
}
