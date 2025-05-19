import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChannel } from "../../app/slices/channelSlice";
import {
  addTweets,
  clearTweetState,
  getTweets,
} from "../../app/slices/TweetsSlice";
const TweetPopUp = ({ onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const user = useSelector(selectCurrentChannel);

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("Tweet content is required!");
      return;
    }

    try {
      await dispatch(addTweets({ content })).unwrap();
      dispatch(clearTweetState());
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="bg-black border-2 border-purple-400 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-purple-400 sticky top-0 bg-black">
          <h2 className="text-xl font-bold text-white">Create Tweet</h2>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white hover:bg-purple-400/20"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white bg-purple-400/20 
                       hover:bg-purple-400/40"
            >
              Tweet
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tweet Content *
            </label>
            <textarea
              name="content"
              value={content}
              onChange={handleInputChange}
              rows={6}
              placeholder="What's happening?"
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetPopUp;
