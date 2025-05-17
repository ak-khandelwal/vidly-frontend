import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideos, selectCurrentVideos } from "../../app/slices/videoSlice";
import { useEffect } from "react";
import { BiPlay } from "react-icons/bi";

const VideoSuggested = ({ videoId, userId }) => {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);

  useEffect(() => {
    if (userId) dispatch(getVideos({ userId }));
  }, [dispatch, userId]);

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-400">
        No more videos from this channel
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col divide-y divide-gray-700">
      {videos.filter((item) => {
        return item._id != videoId
      }).map((item, index) => (
        <Video
          key={index}
          videoId={item?._id}
          thumbnail={item?.thumbnail}
          avatar={item?.owner?.avatar}
          title={item?.title}
          views={item?.views}
          channalName={item?.owner?.fullName}
        />
      ))}
    </div>
  );
};

const Video = ({ videoId, thumbnail, avatar, title, views, channalName }) => (
  <Link
    to={"/watch/" + videoId}
    className="p-3 hover:bg-[#272727] transition-colors flex gap-3"
  >
    <div className="relative flex-shrink-0">
      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="w-36 h-20 object-cover rounded-md"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-black bg-opacity-60 p-2 rounded-full">
          <BiPlay className="text-white size-6" />
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-between overflow-hidden">
      <div>
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        <div className="flex items-center text-xs text-gray-400 mt-1">
          <BiPlay className="mr-1" />
          <span>{views} views</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <img src={avatar} alt={channalName} className="w-5 h-5 rounded-full" />
        <span className="text-xs text-gray-400 truncate">{channalName}</span>
      </div>
    </div>
  </Link>
);

export default VideoSuggested;
