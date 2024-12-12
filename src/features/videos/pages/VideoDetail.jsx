import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById, getVideoLike, likeVideo, selectLiked, selectSubscribed, selectVideoLike, selectVideoPlay, selectVideoPlayStatus } from "../slice/videoSlice";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { getSubscriber, toggleSubscription } from "../../subscribers/slice/SubscriberSlice";
function VideoDetail() {
  const dispatch = useDispatch();
  const video = useSelector(selectVideoPlay);
  const videoStatus = useSelector(selectVideoPlayStatus);
  const videoLike = useSelector(selectVideoLike);
  const liked = useSelector(selectLiked);
  const subscribed = useSelector(selectSubscribed)
  const { videoId } = useParams();
  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoLike({ videoId }));
    }
  }, [dispatch, videoId]);
  useEffect(() => {
    if(videoStatus){
      dispatch(getSubscriber({channelId: video?.owner?._id}))
    }
  },[dispatch,videoStatus,video])
  const handleLike = async (e) => {
    e.preventDefault();
    if(videoId){
      const response = await dispatch(likeVideo({ videoId }))
      if(response.type === "likeVideo/fulfilled")
        dispatch(getVideoLike({ videoId }));
    }
  };
  const handleSubscribe = async(e) => {
    e.preventDefault()
    const res = await dispatch(toggleSubscription({channelId: video.owner._id}))
    if(res.type === "toggleSubscription/fulfilled")
      dispatch(getSubscriber({channelId: video?.owner?._id}))
  }
  return (
    <div className="w-full h-full p-4 text-white">
      <div className="w-[70%]">
        <video
          src={video.videoFile}
          controls
          className="w-[70rem] h-[30rem]"
        ></video>
        <div className="border-2 rounded-t-xl p-4">
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
                {liked ? <BiSolidLike className="size-5"/> : <BiLike className="size-5" />}
              </span>
              <span>{videoLike}</span>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex gap-4">
              <img src={video?.owner?.avatar} className="size-10 rounded-full" />
              <div>
                <h1>{video?.owner?.fullName}</h1>
                <h2 className="text-gray-500 text-sm">243k subscribers</h2>
              </div>
            </div>
            <div className={`w-28 py-2  text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center ${!subscribed ? "bg-[#ae7aff]": "bg-slate-400"} `}

            onClick={(e) => handleSubscribe(e)}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-[70%] border-2 rounded-b-xl p-2">
        <h1>{video?.description}</h1>
      </div>
    </div>
  );
}

export default VideoDetail;
