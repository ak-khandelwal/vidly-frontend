import { Link } from "react-router-dom";
import { timeAgo } from "../../helpers/timeAgo";
const VideoCard = ({
  videoId,
  thumbnail,
  avatar,
  title,
  fullName,
  views,
  createdAt,
  userName,
}) => {
  const time = timeAgo(createdAt);

  return (
    <Link
      to={"/watch/" + videoId}
      className="video-card flex flex-col justify-center items-center w-full"
    >
      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="w-80 h-44 object-cover"
      />
      <div className="mt-2 w-80 flex gap-2">
        <Link to={"/channel/" + userName}>
          <img
            src={avatar}
            alt="Video Thumbnail"
            className="max-h-10 min-h-10 max-w-10 min-w-10 rounded-full"
          />
        </Link>
        <div>
          <h3 className="text-lg font-semibold text-wrap inline-block">
            {title?.slice(0, 60)}
          </h3>
          <p className="text-sm text-gray-400 truncate">{fullName}</p>
          <p className="text-sm text-gray-500 truncate">
            {views} views . {time}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default VideoCard;
