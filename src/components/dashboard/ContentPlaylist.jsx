import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/slices/dashboard";
import { selectCurrentUser } from "../../app/slices/authSlice";
import {
  clearPlayListState,
  getUserPlaylists,
  selectCurrentPlayLists,
} from "../../app/slices/playListSlice";
import PlaylistDropdown from "./PlaylistDropdown";

const ContentPlaylist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectCurrentPlayLists);
  const user = useSelector(selectCurrentUser);

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
    <div className="overflow-x-auto">
      <div className="flex w-[240%] sm:w-full p-4">
        <div className="w-[22rem] sm:w-[28rem]">Playlists</div>
        <div className="w-[12rem]">Videos</div>
        <div className="w-[12rem]">Created</div>
        <div className="">options</div>
      </div>
      <div>
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="flex items-center w-[240%] sm:w-full p-4 border-b border-gray-700"
          >
            {/* Playlist Details */}
            <div className="flex gap-4 w-[22rem] sm:w-[28rem] items-start">
              <div className="relative w-[10rem] h-[5rem] sm:w-[12rem] sm:h-[6rem]">
                <img
                  src={playlist?.thumbnail || "/src/assets/EmptyPlaylist.png"}
                  alt="Playlist Thumbnail"
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                  {playlist?.videos} videos
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1
                  className="text-lg font-semibold text-white line-clamp-2 text-ellipsis max-w-32 sm:max-w-xs"
                  title={playlist?.playlistName}
                >
                  {playlist?.playlistName}
                </h1>
                <p
                  className="text-sm text-gray-400 overflow-hidden text-ellipsis line-clamp-2 max-w-40 sm:max-w-sm"
                  title={playlist?.description}
                >
                  {playlist?.description}{" "}
                </p>
              </div>
            </div>

            {/* Video Count */}
            <div className="w-[12rem] itext-center">
              <span className="px-4 py-1 text-purple-400 border border-purple-400 rounded-full text-sm">
                {playlist?.videos} videos
              </span>
            </div>

            {/* Date */}
            <div className="w-[14rem] text-sm text-gray-300">
              {new Date(playlist?.createdAt).toLocaleDateString()}
            </div>

            {/* Options */}
            <div>
              <PlaylistDropdown playlist={playlist} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPlaylist;
