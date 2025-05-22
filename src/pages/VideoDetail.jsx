import { useEffect, useState } from "react";
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
import { BiLike, BiSolidLike, BiTime, BiPlay } from "react-icons/bi";
import { FaShare, FaBookmark } from "react-icons/fa";
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
    <div className="w-full h-full px-4 py-6 text-white flex flex-col lg:flex-row gap-6 bg-[#121212]">
      <div className="w-full lg:w-[70%]">
        {/* Video Player */}
        <div className="w-full rounded-lg overflow-hidden shadow-xl">
          <video
            src={video.videoFile}
            poster={video?.thumbnail}
            controls
            autoPlay
            className="w-full aspect-video object-cover"
          >
          </video>
        </div>

        {/* Video Info */}
        <div className="mt-4 p-5 bg-[#1e1e1e] rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <BiPlay className="text-gray-400" />
              <span className="text-gray-300 text-sm">{video.views} views</span>
            </div>

            <div className="flex gap-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${liked ? "bg-[#323232]" : "bg-[#272727] hover:bg-[#323232]"} transition-colors`}
                onClick={(e) => handleLike(e)}
              >
                {liked ? (
                  <BiSolidLike className="size-5 text-[#ae7aff]" />
                ) : (
                  <BiLike className="size-5" />
                )}
                <span>{videoLike}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] hover:bg-[#323232] transition-colors">
                <FaShare className="size-4" />
                <span>Share</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] hover:bg-[#323232] transition-colors">
                <FaBookmark className="size-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4 items-center">
              <Link to={`/channel/${video?.owner?.userName}`}>
                <img
                  src={video?.owner?.avatar}
                  alt="Channel avatar"
                  className="size-12 rounded-full border-2 border-[#ae7aff]"
                />
              </Link>
              <div>
                <h1 className="font-bold text-lg">{video?.owner?.fullName}</h1>
                <h2 className="text-gray-400 text-sm">
                  {video?.owner?.subscriberCount} subscribers
                </h2>
              </div>
            </div>

            {video?.owner?._id === currentUser?._id ? (
              <Link
                to={`/channel/${currentUser?.userName}`}
                className="px-6 py-2.5 bg-gradient-to-r from-[#8a63d2] to-[#ae7aff] text-black font-bold rounded-full hover:opacity-90 transition-opacity"
              >
                View Channel
              </Link>
            ) : (
              <button
                className={`px-6 py-2.5 rounded-full font-bold transition-colors ${!video?.owner?.isSubscribed
                  ? "bg-gradient-to-r from-[#8a63d2] to-[#ae7aff] text-black"
                  : "bg-[#323232] text-white border border-gray-600"
                  }`}
                onClick={(e) => handleSubscribe(e)}
              >
                {video?.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>

        {/* Video Description */}
        {video.description && <Description text={video.description} />}
        {/* Comments Section */}
        <div className="mt-4">
          <Comments videoId={video?._id} />
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="w-full lg:w-[30%]">
        <div className="bg-[#1e1e1e] rounded-lg shadow-md overflow-hidden">
          <h2 className="border-b border-gray-700 text-center font-bold text-lg p-3 w-full bg-[#272727]">
            More From This Channel
          </h2>
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
            <VideoSuggested videoId={video?._id} userId={video?.owner?._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
function Description({ text }) {
  const [seeMore, setSeeMore] = useState(false);
  const maxLength = 200
  const isLong = text.length > maxLength;


  const displayText = seeMore || !isLong ? text : text.slice(0, maxLength) + "...";

  const handleToggle = () => setSeeMore(!seeMore);
  return (
    <div className="mt-4 p-5 bg-[#1e1e1e] rounded-lg shadow-md">
      <div className="whitespace-pre-line">
        <h3 className="font-semibold text-gray-300 mb-2">Description</h3>
        <div>
          <p className={`text-gray-400 `}>{displayText}</p>
          {isLong && <button onClick={handleToggle} className="text-blue-400">{seeMore ? "see less" : "..see more"}</button>}
        </div>
      </div>
    </div>
  )
}
export default VideoDetail;
