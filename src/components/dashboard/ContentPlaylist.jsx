import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/slices/dashboard";
import { selectCurrentUser } from "../../app/slices/authSlice";
import {
  clearPlayListState,
  getUserPlaylists,
  selectCurrentPlayLists,
} from "../../app/slices/playListSlice";
import PlaylistDropdown from "./PlaylistDropdown";
import { BiTime } from "react-icons/bi";
import {
  MdOutlinePlaylistPlay,
  MdOutlineVideoLibrary,
  MdOutlineInfo,
} from "react-icons/md";
import PlaylistPopup from "./PlaylistPopup";
import { Link } from "react-router-dom";

const ContentPlaylist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectCurrentPlayLists);
  const user = useSelector(selectCurrentUser);

  const [uploadPlaylistPopUp, setUploadPlaylistPopUp] = useState(false);

  const handleUploadPlayListPopUp = () => {
    setUploadPlaylistPopUp((value) => !value);
  }
  useEffect(() => {
    if (user) {
      dispatch(clearPlayListState());
      dispatch(getUserPlaylists({ userId: user._id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(setActive([0, 1, 0]));
  }, [dispatch]);

  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800 relative flex flex-col">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-[#272727] text-gray-300 font-medium border-b border-gray-700 sticky top-0 z-10">
        <div className="col-span-5 pl-2 flex items-center">
          <span className="flex items-center gap-1">
            <MdOutlinePlaylistPlay className="size-4" />
            <span>Playlist</span>
          </span>
        </div>
        <div className="col-span-3 text-center flex justify-center items-center">
          <span className="flex items-center gap-1">
            <MdOutlineVideoLibrary className="size-4" />
            <span>Videos</span>
          </span>
        </div>
        <div className="col-span-3 text-center flex justify-center items-center">
          <span className="flex items-center gap-1">
            <BiTime className="size-4" />
            <span>Created</span>
          </span>
        </div>
        <div className="col-span-1 text-center flex justify-center items-center">
          <span>Actions</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto min-h-[calc(100vh-400px)] max-h-[calc(100vh-200px)] sm:max-h-[60vh]">
        {playlists.length === 0 ? (
          <div className="text-center py-16 text-gray-400 flex flex-col items-center">
            <div className="bg-[#272727] rounded-full p-6 mb-4">
              <MdOutlineInfo className="size-10 text-gray-500" />
            </div>
            <p className="text-lg mb-2 font-medium text-gray-300">
              No playlists found
            </p>
            <p className="text-sm text-gray-500 max-w-md">
              You haven{"'"}t created any playlists yet. Create a playlist to
              organize your videos.
            </p>
            <button onClick={handleUploadPlayListPopUp} className="mt-6 bg-gradient-to-r from-[#ae7aff] to-[#8a5fff] hover:from-[#9d6aff] hover:to-[#7946ff] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
              Create New Playlist
            </button>
          </div>
        ) : (
          playlists.map((playlist, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-700 hover:bg-[#272727] transition-colors group"
            >
              {/* Playlist Details */}
              <div className="col-span-5 flex gap-4">
                <div className="relative flex-shrink-0 rounded-lg  shadow-md">
                  <img
                    src={playlist?.videos > 0 ? playlist?.thumbnail : "/src/assets/EmptyPlaylist.png"}
                    alt="Playlist Thumbnail"
                    className="w-20 h-12 sm:w-28 sm:h-16 object-cover rounded-md"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white">
                    {playlist?.videos} videos
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <Link 
                    to={`/Playlist/${playlist?._id}`}
                    className="font-medium text-white text-sm sm:text-base line-clamp-1 mb-1 group-hover:text-[#ae7aff] transition-colors"
                  >
                    {playlist?.playlistName}
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                    {playlist?.description || "No description"}
                  </p>
                </div>
              </div>

              {/* Video Count */}
              <div className="col-span-3 text-center">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-purple-400 bg-purple-400 bg-opacity-10 rounded-full text-xs font-medium">
                  <MdOutlineVideoLibrary className="size-3.5 sm:size-4" />
                  <span>{playlist?.videos} videos</span>
                </span>
              </div>

              {/* Created Date */}
              <div className="col-span-3 text-center flex items-center justify-center gap-1.5 text-sm">
                <BiTime className="size-4 text-gray-400" />
                <span className="font-medium">
                  {new Date(playlist?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Options */}
              <div className="col-span-1 text-center flex justify-center">
                <PlaylistDropdown playlist={playlist} />
              </div>
            </div>
          ))
        )}
      </div>

      {uploadPlaylistPopUp && <PlaylistPopup onClose={() => handleUploadPlayListPopUp()} />}
    </div >
  );
};

export default ContentPlaylist;
