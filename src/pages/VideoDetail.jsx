import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearCommentState,
  clearVideoState,
  getVideoById,
  getVideoLike,
  likeVideo,
  selectLiked,
  selectVideoLike,
  selectVideoPlay,
} from "../app/slices/videoSlice";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { toggleSubscription } from "../app/slices/SubscriberSlice";
import VideoSuggested from "../components/videos/VideoSuggested";
import Comments from "../components/videos/Comments";
import { selectCurrentUser } from "../app/slices/authSlice";
function VideoDetail() {
  const dispatch = useDispatch();
  const video = useSelector(selectVideoPlay);
  const videoLike = useSelector(selectVideoLike);
  const liked = useSelector(selectLiked);
  const currentUser = useSelector(selectCurrentUser);
  const { videoId } = useParams();

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoLike({ videoId }));
    }
  }, [dispatch, videoId]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (videoId) {
      await dispatch(likeVideo({ videoId })).unwrap();
      dispatch(getVideoLike({ videoId }));
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    dispatch(toggleSubscription({ channelId: video.owner._id }));
    dispatch(getVideoById({ videoId }));
  };

  useEffect(() => {
    dispatch(clearVideoState());
    dispatch(clearCommentState());
  }, [dispatch, videoId]);
  return (
    <div className="w-full h-full pl-4 text-white flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-[65%]">
        <div className="w-full">
          <video
            src={video.videoFile}
            poster={video?.thumbnail}
            controls
            autoPlay
            className="w-full sm:w-[70rem] h-auto sm:h-[30rem] border-2"
          ></video>
          <div className="border-2 p-4">
            <div className="w-full flex justify-between">
              <div>
                <h1>{video.title}</h1>
                <p className="text-gray-300 text-sm">{video.views} views</p>
              </div>
              <div
                className="border-2 rounded-lg p-1 px-6 h-[50%] flex justify-between gap-2 items-center select-none"
                onClick={(e) => handleLike(e)}
              >
                <span className="border-r-2 items-center pr-3">
                  {liked ? (
                    <BiSolidLike className="size-5" />
                  ) : (
                    <BiLike className="size-5" />
                  )}
                </span>
                <span>{videoLike}</span>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <div className="flex gap-4">
                <img
                  src={video?.owner?.avatar}
                  className="size-10 rounded-full"
                />
                <div>
                  <h1>{video?.owner?.fullName}</h1>
                  <h2 className="text-gray-500 text-sm">
                    {video?.owner?.subscriberCount} subscribers
                  </h2>
                </div>
              </div>
              {video?.owner?._id == currentUser?._id ? (
                <Link
                  to={`/channel/${currentUser?.userName}`}
                  className="p-3  text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center bg-slate-400"
                >
                  view channel
                </Link>
              ) : (
                <div
                  className={`p-3  text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center ${!video?.owner?.isSubscribed ? "bg-[#ae7aff]" : "bg-slate-400"} `}
                  onClick={(e) => handleSubscribe(e)}
                >
                  {video?.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-2 rounded-b-xl p-2">
          <h1>{video?.description}</h1>
        </div>
        <Comments videoId={video?._id} />
      </div>
      <div className="w-[35%] h-fit border-2 rounded-lg">
        <h1 className="border-b-2 text-center font-bold text-lg p-2 w-full">
          MORE VIDEOS OF CHANNEL
        </h1>
        <VideoSuggested userId={video?.owner?._id} />
      </div>
    </div>
  );
}

export default VideoDetail;
