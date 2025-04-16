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
import { FaUserCircle } from "react-icons/fa";

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
      {tweets.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 py-16">
          <p className="text-lg font-semibold">No tweets found</p>
          <p className="text-sm text-gray-500">
            Start tweeting to see your content here.
          </p>
        </div>
      ) : (
        tweets.map((tweet) => (
          <div
            key={tweet._id}
            className="bg-[#121212] border border-gray-700 rounded-lg p-4 transition-all hover:bg-[#1a1a1a]"
          >
            <div className="flex gap-3 items-start">
              {/* Avatar */}
              {tweet.user?.avatar ? (
                <img
                  src={tweet.user.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-gray-500 w-10 h-10" />
              )}

              {/* Tweet Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium text-sm sm:text-base">
                    {tweet.user?.name || "Anonymous"}
                  </h3>
                  <TweetOptionsDropdown tweet={tweet} />
                </div>
                <p className="text-gray-300 text-sm mt-1">{tweet.content}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(tweet.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContentTweets;
