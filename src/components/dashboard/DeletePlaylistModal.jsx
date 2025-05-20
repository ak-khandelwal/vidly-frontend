import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist } from "../../app/slices/playListSlice";

const DeletePlaylistModal = ({ isOpen, onClose, playlist }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.playlist);

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deletePlaylist({ playlistId: playlist._id })).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete playlist:", error);
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
          <h2 className="text-xl font-bold text-white">Delete Playlist</h2>
        </div>

        <div className="p-6">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          <p className="text-white">
            Are you sure you want to delete the playlist "{playlist?.playlistName}"?
            This action cannot be undone.
          </p>
        </div>

        <div className="p-4 border-t border-purple-400 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white hover:bg-purple-400/20 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 border border-red-400 rounded-md text-sm 
                     font-medium text-white bg-red-400/20 
                     hover:bg-red-400/40 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Playlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlaylistModal;
