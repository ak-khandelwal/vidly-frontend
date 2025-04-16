import { Link } from "react-router-dom";
import { timeAgo } from "../../helpers/timeAgo";
import { useState } from "react";
import { IoEyeOutline, IoTimeOutline } from "react-icons/io5";

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
  const [isHovered, setIsHovered] = useState(false);

  // Function to format view count with K, M notation
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="group w-full h-full">
      <Link
        to={"/watch/" + videoId}
        className="flex flex-col w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          {/* Thumbnail with hover effect */}
          <img
            src={thumbnail}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Video duration overlay - this would be dynamic in a real app */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-1.5 py-0.5 rounded text-xs font-medium">
            12:34
          </div>

          {/* Hover overlay with play button */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            <div className="w-12 h-12 rounded-full bg-black bg-opacity-60 flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-3">
          {/* Creator Avatar */}
          <Link
            to={"/channel/" + userName}
            className="flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={avatar}
              alt={fullName}
              className="w-9 h-9 rounded-full object-cover hover:ring-2 hover:ring-purple-500 transition-all"
            />
          </Link>

          {/* Video Information */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium line-clamp-2 group-hover:text-purple-400 transition-colors">
              {title}
            </h3>

            <Link
              to={"/channel/" + userName}
              className="block mt-1 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {fullName}
            </Link>

            <div className="flex items-center mt-1 text-xs text-zinc-500">
              <span className="flex items-center">
                <IoEyeOutline className="mr-1" />
                {formatViewCount(views)} views
              </span>
              <span className="mx-1.5">•</span>
              <span className="flex items-center">
                <IoTimeOutline className="mr-1" />
                {time}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
