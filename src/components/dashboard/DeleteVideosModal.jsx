import { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearPlayListState, getPlaylist, getUserPlaylists, removeVideoFromPlaylist, selectPlayList } from "../../app/slices/playListSlice";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { toast } from "react-toastify";

const DeleteVideosModal = ({ isOpen, onClose, playlist }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const playlistData = useSelector(selectPlayList);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && playlist?._id) {
      dispatch(getPlaylist({ playListId: playlist._id }));
    }
  }, [isOpen, playlist?._id, dispatch]);

  const handleToggleVideo = (videoId) => {
    setSelectedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId],
    );
  };

  const handleDelete = async () => {
    if (selectedVideos.length === 0) {
      toast.warning("Please select at least one video to remove");
      return;
    }

    setLoading(true);
    try {
      const promises = selectedVideos.map(videoId =>
        dispatch(removeVideoFromPlaylist({
          playlistId: playlist._id,
          videoId
        })).unwrap()
      );

      await Promise.all(promises);
      toast.success("Videos removed from playlist successfully");
      dispatch(clearPlayListState());
      dispatch(getUserPlaylists({ userId: user._id }));
      onClose();
    } catch (error) {
      console.error("Failed to remove videos from playlist:", error);
      toast.error(error.message || "Failed to remove videos from playlist");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-purple-400 rounded-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-purple-400">
          <h2 className="text-xl font-bold text-white">
            Remove Videos from Playlist
          </h2>
        </div>

        <div className="p-4">
          <div className="max-h-96 overflow-y-auto space-y-2">
            {playlistData?.videos?.map((video) => (
              <div
                key={video._id}
                onClick={() => handleToggleVideo(video._id)}
                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-purple-400/10"
              >
                <div
                  className={`w-5 h-5 rounded border ${
                    selectedVideos.includes(video._id)
                      ? "border-red-400 bg-red-400"
                      : "border-red-400"
                  } flex items-center justify-center`}
                >
                  {selectedVideos.includes(video._id) && (
                    <IoMdCheckmark className="text-black" />
                  )}
                </div>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-10 object-cover rounded"
                />
                <span className="text-white">{video.title}</span>
              </div>
            ))}
          </div>
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
            disabled={loading || selectedVideos.length === 0}
            className="px-4 py-2 border border-red-400 rounded-md text-sm 
                     font-medium text-white bg-red-400/20 
                     hover:bg-red-400/40 disabled:opacity-50"
          >
            {loading ? "Removing..." : `Remove Selected Videos (${selectedVideos.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVideosModal;
