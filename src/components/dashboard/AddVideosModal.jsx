import { useEffect, useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVideoState,
  getVideos,
  incrementPageState,
  selectCurrentHasMore,
  selectCurrentPage,
  selectCurrentVideos,
} from "../../app/slices/videoSlice";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { addVideoToPlaylist, clearPlayListState, getPlaylist, getUserPlaylists, selectPlayList } from "../../app/slices/playListSlice";
import { toast } from "react-toastify";

const AddVideosModal = ({ isOpen, onClose, playlist }) => {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);
  const page = useSelector(selectCurrentPage);
  const user = useSelector(selectCurrentUser);
  const playlistData = useSelector(selectPlayList);
  const [loading, setLoading] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const elementRef = useRef(null);

  // Get existing video IDs from playlist
  const existingVideoIds = playlistData?.videos?.map(video => video._id) || [];
  
  // Fetch playlist details
  useEffect(() => {
    if (playlist?._id && isOpen) {
      dispatch(getPlaylist({ playListId: playlist._id }));
    }
  }, [dispatch, playlist?._id, isOpen]);

  // Initial video fetch
  useEffect(() => {
    if (user && isOpen) {
      dispatch(clearVideoState());
      setLoading(true);
      dispatch(getVideos({ userId: user._id, page: 1, limit: 2 }))
        .unwrap()
        .then(() => {
          dispatch(incrementPageState());
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch videos:", err);
          setLoading(false);
        });
    }
  }, [dispatch, user, isOpen]);

  // Pagination fetch
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading && videos.length > 0) {
        setLoading(true);
        dispatch(getVideos({ userId: user?._id, page, limit: 2 }))
          .unwrap()
          .then(() => {
            dispatch(incrementPageState());
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch videos:", err);
            setLoading(false);
          });
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, user, hasMore, loading, videos.length]);

  const handleToggleVideo = (videoId) => {
    // Don't allow toggling if video is already in playlist
    if (existingVideoIds.includes(videoId)) return;

    setSelectedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId],
    );
  };

  const handleSave = async () => {
    if (selectedVideos.length === 0) {
      toast.warning("Please select at least one video");
      return;
    }

    try {
      const promises = selectedVideos.map(videoId =>
        dispatch(addVideoToPlaylist({
          playlistId: playlist._id,
          videoId
        })).unwrap()
      );

      await Promise.all(promises);
      toast.success("Videos added to playlist successfully");
      dispatch(clearPlayListState());
      dispatch(getUserPlaylists({ userId: user._id }));
      onClose();
    } catch (error) {
      console.error("Failed to add videos to playlist:", error);
      toast.error(error.message || "Failed to add videos to playlist");
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
            Add Videos to Playlist
          </h2>
        </div>

        <div className="p-4">
          <div className="max-h-96 overflow-y-auto space-y-2">
            {loading && videos.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="w-8 h-8 border-t-2 border-[#ae7aff] border-r-2 rounded-full animate-spin mx-auto mb-2"></div>
                <p>Loading videos...</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No videos available to add</p>
              </div>
            ) : (
              videos.map((video) => {
                const isInPlaylist = existingVideoIds.includes(video._id);
                return (
                  <div
                    key={video._id}
                    onClick={() => handleToggleVideo(video._id)}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer 
                      ${isInPlaylist 
                        ? 'opacity-50 cursor-not-allowed bg-gray-800/50' 
                        : 'hover:bg-purple-400/10'}`}
                  >
                    <div
                      className={`w-5 h-5 rounded border ${
                        isInPlaylist
                          ? "border-gray-500 bg-gray-500"
                          : selectedVideos.includes(video._id)
                          ? "border-purple-400 bg-purple-400"
                          : "border-purple-400"
                      } flex items-center justify-center`}
                    >
                      {isInPlaylist ? (
                        <IoMdCheckmark className="text-gray-700" />
                      ) : selectedVideos.includes(video._id) && (
                        <IoMdCheckmark className="text-black" />
                      )}
                    </div>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-white">{video.title}</span>
                      {isInPlaylist && (
                        <span className="text-xs text-gray-400">Already in playlist</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Loading indicator for pagination */}
            {hasMore && videos.length > 0 && (
              <div ref={elementRef} className="text-center py-4 text-gray-400">
                <div className="w-8 h-8 border-t-2 border-[#ae7aff] border-r-2 rounded-full animate-spin mx-auto mb-2"></div>
                <span className="text-sm font-medium">Loading more videos...</span>
              </div>
            )}
          </div>
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
            disabled={selectedVideos.length === 0}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white bg-purple-400/20 
                     hover:bg-purple-400/40 disabled:opacity-50"
          >
            Add Selected Videos ({selectedVideos.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVideosModal;
