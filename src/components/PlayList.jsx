import { Link } from "react-router-dom";

function PlayList({ thumbnail, playlistName, description, views, playlistId }) {
  return (
    <Link to={`/Playlist/${playlistId}`} >
     <div className="bg-gray-800 flex flex-col justify-center items-center w-full overflow-hidden shadow-lg">
      <img
        className="w-full h-auto"
        src={thumbnail || "/src/assets/EmptyPlaylist.png"}
        alt="React Mastery"
      />
      <div className="p-4">
        <div className="text-gray-400 text-sm mb-2">
          Playlist &middot; {views} Views &middot; 2 hours ago
        </div>
        <div className="text-xl font-semibold text-white mb-2">{playlistName}</div>
        <div className="text-sm text-gray-300">
          {description}
        </div>
      </div>
    </div>
    </Link>
  );
}

export default PlayList;
