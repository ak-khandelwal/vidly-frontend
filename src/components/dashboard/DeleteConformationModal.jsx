const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, videoTitle }) => {
  if (!isOpen) return null;

  return (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-black border-2 border-purple-400 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">Delete Video</h2>
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete "{videoTitle}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm font-medium text-white hover:bg-purple-400/20"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 border border-red-500 rounded-md text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/40"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal
