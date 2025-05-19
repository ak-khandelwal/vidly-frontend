import { useDispatch } from 'react-redux';
import { deleteTweet } from '../app/slices/TweetsSlice';
import { toast } from 'react-toastify';

const DeleteTweetModal = ({ isOpen, onClose, tweet }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteTweet({ tweetId: tweet._id })).unwrap();
      toast.success('Tweet deleted successfully');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to delete tweet');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-purple-400 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-purple-400">
          <h2 className="text-xl font-bold text-white">Delete Tweet</h2>
        </div>

        <div className="p-6">
          <p className="text-white">
            Are you sure you want to delete this tweet? This action cannot be
            undone.
          </p>
        </div>

        <div className="p-4 border-t border-purple-400 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white hover:bg-purple-400/20"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-red-400 rounded-md text-sm 
                     font-medium text-white bg-red-400/20 
                     hover:bg-red-400/40"
          >
            Delete Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTweetModal;
