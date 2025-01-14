import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/slices/dashboard";
import {
  clearTweetState,
  getTweets,
  selectTweets,
} from "../../app/slices/TweetsSlice";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { useEffect } from "react";
import TweetOptionsDropdown from "../../pages/TweetOptionsDropDown";

const ContentTweets = () => {
  const tweets = useSelector(selectTweets);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearTweetState());
    dispatch(setActive([0, 0, 1]));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getTweets({ userId: user?._id }));
    }
  }, [dispatch, user]);
  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          className="bg-black border-b-2 border-b-purple-400/80 rounded-lg p-4"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-white">{tweet.content}</p>
              <p className="text-gray-400 text-sm mt-2">
                {new Date(tweet.createdAt).toLocaleDateString()}
              </p>
            </div>
            <TweetOptionsDropdown tweet={tweet} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentTweets;
