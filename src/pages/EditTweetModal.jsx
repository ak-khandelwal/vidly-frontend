import { useState } from "react";
const EditTweetModal = ({ isOpen, onClose, tweet }) => {
  const [content, setContent] = useState(tweet?.content || "");

  const handleSave = async () => {
    // Implement save logic
    onClose();
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
          />
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
            onClick={handleSave}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white bg-purple-400/20 
                     hover:bg-purple-400/40"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTweetModal
