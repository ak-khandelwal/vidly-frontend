import { IoMdCheckmark } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideoToPlaylist,
  clearPlayListState,
  getUserPlaylists,
  selectCurrentPlayLists,
} from "../../app/slices/playListSlice";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PlaylistSelectorModal = ({ isOpen, onClose, video }) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playlistStatuses, setPlaylistStatuses] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const playlists = useSelector(selectCurrentPlayLists);
  const user = useSelector(selectCurrentUser);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Reset all states when modal closes
      setSelectedPlaylists([]);
      setPlaylistStatuses({});
      setIsSaving(false);
      setIsExpanded(false);
    }
  }, [isOpen]);

  // Fetch playlists when user is available
  useEffect(() => {
    if (user && isOpen) {
      dispatch(clearPlayListState());
      dispatch(getUserPlaylists({ userId: user._id }));
    }
  }, [dispatch, user, isOpen]);

  const togglePlaylist = (playlistId) => {
    if (isSaving) return;
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId],
    );
  };

  const handleSave = async () => {
    if (selectedPlaylists.length < 1) {
      alert("Please select at least one playlist");
      return;
    }

    setIsSaving(true);

    for (const playlistId of selectedPlaylists) {
      setPlaylistStatuses((prev) => ({
        ...prev,
        [playlistId]: "loading",
      }));

      try {
        await dispatch(
          addVideoToPlaylist({
            videoId: video._id,
            playlistId: playlistId,
          }),
        ).unwrap();

        // Simulate a slight delay for visual feedback
        await new Promise((resolve) => setTimeout(resolve, 500));

        setPlaylistStatuses((prev) => ({
          ...prev,
          [playlistId]: "completed",
        }));
      } catch (error) {
        setPlaylistStatuses((prev) => ({
          ...prev,
          [playlistId]: "error",
        }));
      } finally {
        // Reset states and close modal
        setIsSaving(false);
        setSelectedPlaylists([]);
        setPlaylistStatuses({});
        onClose();
      }
    }
    // Close modal after a brief delay to show completion
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    if (!isSaving) {
      // Only allow closing if not currently saving
      setSelectedPlaylists([]);
      setPlaylistStatuses({});
      setIsExpanded(false);
      onClose();
    }
  };

  if (!isOpen) return null;

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
          <h2 className="text-xl font-bold text-white">Add to Playlist</h2>
        </div>

        <div className="p-4">
          {/* Video Preview */}
          <div className="flex items-center gap-3 mb-4 p-2 bg-purple-400/10 rounded">
            <img
              src={video?.thumbnail}
              alt={video?.title}
              className="w-20 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-white font-medium truncate">
                {video?.title}
              </h3>
              <p className="text-gray-400 text-sm">Select playlists below</p>
            </div>
          </div>

          {/* Playlist Selector */}
          <div
            className={`space-y-2 ${!isExpanded ? "max-h-48" : "max-h-96"} overflow-y-auto transition-all duration-300`}
          >
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                onClick={() => togglePlaylist(playlist._id)}
                className={`flex items-center gap-3 p-3 rounded cursor-pointer 
                  ${!isSaving ? "hover:bg-purple-400/10" : ""} 
                  transition-colors`}
              >
                <div
                  className={`w-5 h-5 rounded border ${selectedPlaylists.includes(playlist._id)
                      ? "border-purple-400 bg-purple-400"
                      : "border-purple-400"
                    } flex items-center justify-center`}
                >
                  {playlistStatuses[playlist._id] === "loading" ? (
                    <AiOutlineLoading3Quarters className="w-4 h-4 text-black animate-spin" />
                  ) : playlistStatuses[playlist._id] === "completed" ? (
                    <IoMdCheckmark className="text-black bg-green-400" />
                  ) : (
                    selectedPlaylists.includes(playlist._id) && (
                      <IoMdCheckmark className="text-black opacity-50" />
                    )
                  )}
                </div>
                <span className="text-white">{playlist.playlistName}</span>
              </div>
            ))}
          </div>

          {playlists.length > 4 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-400 text-sm mt-2 hover:text-purple-300"
              disabled={isSaving}
            >
              Show {isExpanded ? "less" : "more"}
            </button>
          )}
        </div>

        <div className="p-4 border-t border-purple-400 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white hover:bg-purple-400/20 
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || selectedPlaylists.length === 0}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white bg-purple-400/20 
                     hover:bg-purple-400/40 disabled:opacity-50 
                     disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSelectorModal;
