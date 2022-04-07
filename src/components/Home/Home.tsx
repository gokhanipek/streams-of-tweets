import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tweet } from '../../store/reducers/reducers';
import { tweets$ } from '../../store/tweetStream';
import { useObservable } from '../../utils/useObservable';
import TweetComponent from '../Tweet/Tweet';
import styles from "./Home.module.scss";
import twitterIcon from "./../../assets/twitterIcon.svg";
import { clearAllLikes } from '../../store/actionCreators/tweetsActionCreators';

const HOME: string = 'home';
const LIKES: string = 'likes';

interface RootState {
  likes: Array<Tweet>;
}

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const newTweet: Tweet | undefined = useObservable(tweets$);
    const [tweetList, setTweetList] = useState<Array<Tweet | undefined>>([]);
    const [reversedList, setReversedList] = useState<Array<Tweet | undefined>>([]);
    const [activeTab, setActiveTab] = useState(HOME);
    const likedTweets = (state: RootState) => state.likes
    const likes = useSelector(likedTweets);

    useEffect(()=>{
        newTweet ? setTweetList([...tweetList, newTweet]) : setTweetList([]);
        setReversedList(tweetList.reverse());
    }, [newTweet]);

    const onClickHandler = () => {
      dispatch(clearAllLikes())
    }

    const tabTweetsStream = reversedList?.map(
      item => {
        return Boolean(item) ? <TweetComponent 
          account={item?.account} 
          timestamp={item?.timestamp} 
          content={item?.content}
        /> : <div>nothing here</div>
      } 
    )

    const tabLikes = likes?.map(
      item => <>
          <button onClick={onClickHandler}>Clear All Likes</button>
          <TweetComponent 
            account={item?.account} 
            timestamp={item?.timestamp} 
            content={item?.content}
          />
      </>
    )

    const noTweets = 
    <div className={styles.twitterIcon}>
      <img alt="twitter-icon" src={twitterIcon} />
      <p>Nothing here yet...</p>
    </div>



    return (
      <div className={styles.home}>
        <div className={styles.homeTabs}>
            <div className={styles.tabs} onClick={() => setActiveTab(HOME)}>Home</div>
            <div className={styles.tabs} onClick={() => setActiveTab(LIKES)}>Likes</div>
        </div>
        {activeTab === HOME && !Boolean(tabTweetsStream.length) ? noTweets : null }
        {activeTab === LIKES && !Boolean(likes.length) ? noTweets : null }
        {activeTab === HOME ? tabTweetsStream : tabLikes}
      </div>
    )
}

export default Home;
