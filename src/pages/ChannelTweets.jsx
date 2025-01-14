import { useEffect, useState } from "react";
import { selectCurrentChannel, setActive } from "../app/slices/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addTweets,
  clearTweetState,
  getTweets,
  selectTweets,
} from "../app/slices/TweetsSlice";
import TweetsList from "../components/tweets/TweetsList";

function ChannelTweets() {
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweets);
  const user = useSelector(selectCurrentChannel);
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(setActive([0, 0, 1, 0]));
    dispatch(clearTweetState());
    dispatch(getTweets({ userId: user?._id }));
  }, [dispatch, user]);

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (content !== "") {
      try {
        await dispatch(addTweets({ content })).unwrap();
        dispatch(getTweets({ userId: user?._id }));
        setContent("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };
  return (
    <div>
      <div className="flex gap-4 items-start border-b-2 p-4">
        <div className="p-2">
          <div className="border-r-2 mb-4">
            <h1 className="h-full">{tweets?.length}</h1>
            <h1 className="h-full">Tweets</h1>
          </div>
          <button
            className="bg-[#ae7aff] text-black p-2 rounded-sm"
            onClick={(e) => handleSumbit(e)}
          >
            Tweet
          </button>
        </div>
        <textarea
          className="w-full bg-transparent font-semibold px-2 py-1 border border-gray-300 rounded-md resize-none focus:outline-none "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your valuable tweets here..."
          rows="4"
        ></textarea>
      </div>
      <div className="p-4 flex flex-col gap-6">
        {tweets.map((item, index) => (
          <TweetsList
            key={index}
            content={item.content}
            avatar={user.avatar}
            fullname={user.fullName}
            username={user.userName}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default ChannelTweets;
