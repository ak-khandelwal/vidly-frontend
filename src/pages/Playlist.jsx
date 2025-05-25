import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist, selectPlayList } from "../app/slices/playListSlice";
import { Link, useParams } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

function Playlist() {
  const playlistId = useParams().playListId;
  const playlist = useSelector(selectPlayList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playlistId) {
      dispatch(getPlaylist({ playListId: playlistId }));
    }
  }, [dispatch, playlistId]);

  if (!playlist._id) {
    return (
      <div className="text-white text-2xl w-full h-full flex justify-center items-center">
        Loading ...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Playlist Details Sidebar (25% width) */}
      <div className="w-1/4 min-w-[300px] bg-purple-900/20 p-6 h-screen overflow-y-auto">
        <div className="sticky top-6">
          {/* Playlist Thumbnail */}
          <div className="aspect-video w-full bg-purple-800/20 rounded-lg overflow-hidden mb-4">
            <img
              src={playlist?.videos?.length > 0 ? playlist?.videos[0].thumbnail : "/src/assets/EmptyPlaylist.png"}
              alt="Playlist thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Playlist Info */}
          <h1 className="text-2xl font-bold mb-2">{playlist?.playlistName}</h1>
          <p className="text-gray-400 mb-4">{playlist?.description}</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span>{playlist?.videos?.length || 0} videos</span>
            <span>Created {new Date(playlist?.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>

      {/* Videos Grid Section (75% width) */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {playlist?.videos?.map((video) => (
            <Link to={`/watch/` + video?._id}
              key={video._id}
              className="bg-purple-900/10 rounded-lg overflow-hidden"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={video?.thumbnail}
                  alt={video?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs flex items-center gap-1">
                  <FaRegClock className="w-3 h-3" />
                  {Math.floor(video?.duration)}s
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="flex gap-3 mb-2">
                  <Link to={`/channel/` + playlist?.owner?.userName} >
                    <img
                      src={playlist?.owner?.avatar}
                      alt={video.fullName}
                      className="w-10 hover:border-2 hover:rounded-full hover:border-purple-100 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <h3 className="font-medium truncate">{video.title}</h3>
                    <p className="text-sm text-gray-400">
                      {playlist.owner.userName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {playlist.owner.userName}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div >
  );
}
export default Playlist;
