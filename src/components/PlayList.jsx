import { Link } from "react-router-dom";

function PlayList({ thumbnail, playlistName, description, videos, playlistId }) {
  return (
    <Link to={`/Playlist/${playlistId}`}>
      <div className="bg-gray-800 flex flex-col justify-center items-center w-full overflow-hidden shadow-lg rounded-xl border border-gray-700 hover:scale-105 hover:shadow-2xl transition-transform duration-200 group">
        <div className="w-full aspect-video bg-gray-700 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
            src={thumbnail || "/src/assets/EmptyPlaylist.png"}
            alt="Playlist Thumbnail"
          />
        </div>
        <div className="p-4 w-full">
          <div className="text-gray-400 text-xs mb-1 flex items-center gap-2">
            Playlist
            <span className="mx-1">·</span>
            {videos && videos > 0 ? `${videos} Videos` : "No videos"}
            <span className="mx-1">·</span>
            <span>2 hours ago</span>
          </div>
          <div className="text-lg font-semibold text-white mb-1 truncate">{playlistName}</div>
          <div className="text-sm text-gray-300 line-clamp-2 min-h-[2.5em]">
            {description || "No description"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlayList;
