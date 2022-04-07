import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styles from "./Tweet.module.scss";
import user from "./../../assets/user.png";
import { likeTweet, unlikeTweet } from '../../store/actionCreators/tweetsActionCreators';
import { Tweet } from '../../store/reducers/reducers';

interface Props {
    account?: string;
    content?: string;
    timestamp?: number;
}

interface RootState {
    likes: Array<Tweet>;
}

const TweetComponent:React.FC<Props>  = ({account, content, timestamp = 0}) => {
    const tweetDate = new Date(timestamp).toLocaleTimeString();
    const dispatch = useDispatch();

    const likedTweets = (state: RootState) => state.likes
    const likes = useSelector(likedTweets);

    const isLiked = likes.filter(item => item.timestamp === timestamp && item.account === account).length;

    const tweetLikeHandler = () => {
        const tweet: Tweet = {
            account, content, timestamp
        }
        Boolean(isLiked) ? dispatch(unlikeTweet(tweet)) : dispatch(likeTweet(tweet));
    }

    const red = Boolean(isLiked) ? styles.red : '';

    return (
        <div className={styles.tweetContainer}>
            <div className={styles.title}>
                <img src={user} alt="user" />
                <div className={styles.info}>
                    <h4 className={styles.name}>{account}</h4>
                    <p className={styles.twitterHandle}>@{account}</p>
                </div>
            </div>
            <div className={styles.tweet}>
                <p>{content}</p>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.timeAndDate}>
                    <p>{tweetDate}</p>
                </div>
                <div className={`${styles.likeButton} ${red}`} onClick={tweetLikeHandler}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                        </path>
                    </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default TweetComponent;
