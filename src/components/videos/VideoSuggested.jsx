import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideos, selectCurrentVideos } from "../../app/slices/videoSlice";
import { useEffect } from "react";

const VideoSuggested = ({ userId }) => {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);

  useEffect(() => {
    if (userId) dispatch(getVideos({ userId }));
  }, [dispatch, userId]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {videos.map((item, index) => {
        return (
          <Video
            key={index}
            videoId={item?._id}
            thumbnail={item?.thumbnail}
            avatar={item?.owner?.avatar}
            title={item?.title}
            views={item?.views}
            channalName={item?.owner?.fullName}
          />
        );
      })}
    </div>
  );
};

const Video = ({ videoId, thumbnail, avatar, title, views, channalName }) => (
  <Link
    to={"/watch/" + videoId}
    className="video-card flex w-full gap-4 border-b-2 p-4"
  >
    <img
      src={thumbnail}
      alt="Video Thumbnail"
      className="w-[280px] h-[150px] object-cover"
    />
    <div className="mt-2 w-80 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{views} views</p>
      </div>
      <div className="flex gap-4">
        <img src={avatar} alt="Video Thumbnail" className="w-10 rounded-full" />
        <h1 className=""> {channalName}</h1>
      </div>
    </div>
  </Link>
);

export default VideoSuggested;
