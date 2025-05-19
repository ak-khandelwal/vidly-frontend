import { useState } from "react";
import { useDispatch } from 'react-redux';
import { editTweet } from '../app/slices/TweetsSlice';
import { toast } from 'react-toastify';

const EditTweetModal = ({ isOpen, onClose, tweet }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(tweet?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Tweet content cannot be empty');
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(editTweet({ tweetId: tweet._id, content })).unwrap();
      toast.success('Tweet updated successfully');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to update tweet');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-purple-400 rounded-lg w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-purple-400">
          <h2 className="text-xl font-bold text-white">Edit Tweet</h2>
        </div>

        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 rounded border border-purple-400 bg-black/50 
                     text-white px-3 py-2 focus:outline-none focus:ring-2 
                     focus:ring-purple-400/50"
            placeholder="What's happening?"
            disabled={isSubmitting}
          />
        </div>

        <div className="p-4 border-t border-purple-400 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white hover:bg-purple-400/20"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white bg-purple-400/20 
                     hover:bg-purple-400/40 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTweetModal;
