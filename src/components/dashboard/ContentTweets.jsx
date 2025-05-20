import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/slices/dashboard";
import {
  clearTweetState,
  getTweets,
  selectTweets,
} from "../../app/slices/TweetsSlice";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { useEffect, useState } from "react";
import TweetOptionsDropdown from "../../pages/TweetOptionsDropDown";
import { MdOutlineInfo } from "react-icons/md";
import TweetPopUp from "./TweetPopUp";

const ContentTweets = () => {
  const tweets = useSelector(selectTweets);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [tweetUploadPopUp, setTweetUploadPopUp] = useState(false)

  const handleTweetUploadPopUp = () => {
    setTweetUploadPopUp((value) => !value);
  }

  useEffect(() => {
    dispatch(clearTweetState());
    dispatch(setActive([0, 0, 1]));
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getTweets({ userId: user._id }));
    }
  }, [dispatch, user, tweets]);

  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800 relative flex flex-col">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-[#272727] text-gray-300 font-medium border-b border-gray-700 sticky top-0 z-10">
        <div className="col-span-8 pl-2">
          <span>Content</span>
        </div>
        <div className="col-span-3 text-center">
          <span>Date</span>
        </div>
        <div className="col-span-1 text-center">
          <span>Actions</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto min-h-[calc(100vh-400px)] max-h-[calc(100vh-200px)] sm:max-h-[60vh]">
        {tweets.length === 0 ? (
          <div className="text-center py-16 text-gray-400 flex flex-col items-center">
            <div className="bg-[#272727] rounded-full p-6 mb-4">
              <MdOutlineInfo className="size-10 text-gray-500" />
            </div>
            <p className="text-lg mb-2 font-medium text-gray-300">
              No Tweet found
            </p>
            <p className="text-sm text-gray-500 max-w-md">
              You haven{"'"}t tweet yet. post a tweet
            </p>
            <button onClick={handleTweetUploadPopUp} className="mt-6 bg-gradient-to-r from-[#ae7aff] to-[#8a5fff] hover:from-[#9d6aff] hover:to-[#7946ff] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
              post new tweet
            </button>
          </div>
        ) : (
          tweets.map((tweet) => (
            <div
              key={tweet._id}
              className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-700 hover:bg-[#272727] transition-colors"
            >
              {/* Tweet Content */}
              <div className="col-span-8">
                <p className="text-gray-300 text-sm">{tweet.content}</p>
              </div>
              
              {/* DateTime */}
              <div className="col-span-3 text-center">
                <p className="text-gray-500 text-xs">
                  {new Date(tweet.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Options */}
              <div className="col-span-1 text-center flex justify-center">
                <TweetOptionsDropdown tweet={tweet} />
              </div>
            </div>
          ))
        )}
      </div>

      {tweetUploadPopUp && <TweetPopUp onClose={() => handleTweetUploadPopUp()} />}
    </div>
  );
};

export default ContentTweets;
