import { HiOutlineDotsVertical } from "react-icons/hi";
import { timeAgo } from "../../helpers/timeAgo";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { BiPlay } from "react-icons/bi";
import { MdOutlineVisibility } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFromWatchHistory } from "../../app/slices/authSlice";

const VideoList = ({
  videoId,
  thumbnail,
  avatar,
  title,
  description,
  views,
  channalName,
  createdAt,
}) => {
  const time = timeAgo(createdAt);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const dispatch = useDispatch();

  const toggleOptions = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  };

  const handleRemoveFromHistory = async (e) => {
    e.preventDefault();
    try {
      await dispatch(removeFromWatchHistory({ videoId })).unwrap();
      setShowOptions(false);
    } catch (error) {
      console.error("Failed to remove from history:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors group">
      <div className="flex flex-col md:flex-row">
        <Link
          to={"/watch/" + videoId}
          className="flex flex-col md:flex-row w-full"
        >
          <div className="relative md:w-[40%] lg:w-[35%] h-auto">
            <img
              src={thumbnail}
              alt="Video Thumbnail"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <BiPlay className="text-white text-3xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 md:p-5 w-full md:w-[60%] lg:w-[65%]">
            <h3 className="text-lg md:text-xl font-semibold line-clamp-2 group-hover:text-[#ae7aff] transition-colors">
              {title}
            </h3>

            <div className="flex items-center gap-1 mt-2 text-sm text-gray-400">
              <MdOutlineVisibility className="text-gray-500" />
              <span>{views?.toLocaleString() || 0} views</span>
              <span className="mx-1">•</span>
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <img
                src={avatar}
                alt={channalName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <h4 className="text-sm text-gray-300 font-medium">
                {channalName}
              </h4>
            </div>

            <p className="mt-3 text-sm text-gray-400 line-clamp-2 md:line-clamp-3">
              {description}
            </p>
          </div>
        </Link>

        <div className="relative p-2 md:p-4 flex items-start">
          <button
            onClick={toggleOptions}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <HiOutlineDotsVertical className="text-gray-400" />
          </button>

          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute right-0 top-10 bg-[#272727] rounded-lg shadow-lg border border-gray-700 z-10 w-48"
            >
              <ul>
                <li 
                  onClick={handleRemoveFromHistory}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors text-red-400 hover:text-red-300"
                >
                  Remove from history
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoList;
