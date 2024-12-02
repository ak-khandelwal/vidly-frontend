import { useEffect } from "react";
import { selectCurrentChannel, setActive } from "../../channel/slice/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearTweetState, getTweets, selectTweets } from "../slice/TweetsSlice";
import TweetsList from "../components/TweetsList";

function ChannelTweets() {
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweets);
  const user = useSelector(selectCurrentChannel);
  useEffect(()=>{
    dispatch(setActive([0,0,1,0]));
  },[dispatch])
  useEffect(() => {
    if(user){
      dispatch(clearTweetState())
      dispatch(getTweets({userId:user?._id}))
    }
  },[dispatch,user])

  return (
    <div >
      <div className="p-4 flex flex-col gap-6">
      {tweets.map((item,index) => (
        <TweetsList key={index} content={item.content} avatar={user.avatar} fullname={user.fullName} />
      ))}
      </div>
    </div>
  )
}

export default ChannelTweets