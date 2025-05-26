import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/slices/dashboard";
import {
  clearVideoState,
  getUserVideos,
  incrementPageState,
  selectCurrentHasMore,
  selectCurrentPage,
  selectCurrentVideos,
} from "../../app/slices/videoSlice";
import { selectCurrentUser } from "../../app/slices/authSlice";
import VideoDropdown from "./VideoDropDown";
import { BiPlay, BiTime } from "react-icons/bi";
import {
  MdOutlineVisibility,
  MdOutlinePublic,
  MdOutlineLock,
  MdOutlineInfo,
} from "react-icons/md";
import { Link } from "react-router-dom";
import VideoPopUp from "./VideoPopUp";

const ContentVideo = () => {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);
  const page = useSelector(selectCurrentPage);
  const user = useSelector(selectCurrentUser);

  const [loading, setLoading] = useState(false);
  const [uploadVideoPopUp, setUploadVideoPopUp] = useState(false);

  const elementRef = useRef(null);

  const handleUploadVideoPopUp = () => {
    setUploadVideoPopUp((value) => !value);
  }
  useEffect(() => {
    dispatch(setActive([1, 0, 0]));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(clearVideoState());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        dispatch(getUserVideos({ page, limit: 6 }))
          .unwrap()
          .then(() => {
            dispatch(incrementPageState());
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch videos:", err);
            setLoading(false);
          });
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, hasMore, loading]);

  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-gray-800">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-[#272727] text-gray-300 font-medium border-b border-gray-700 sticky top-0 z-10">
        <div className="col-span-5 pl-2 flex items-center">
          <span>Video</span>
        </div>
        <div className="col-span-2 text-center flex justify-center items-center">
          <span>Visibility</span>
        </div>
        <div className="col-span-2 text-center flex justify-center items-center">
          <span className="flex items-center gap-1">
            <MdOutlineVisibility className="size-4" />
            <span>Views</span>
          </span>
        </div>
        <div className="col-span-2 text-center flex justify-center items-center">
          <span className="flex items-center gap-1">
            <BiTime className="size-4" />
            <span>Date</span>
          </span>
        </div>
        <div className="col-span-1 text-center flex justify-center items-center">
          <span>Actions</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto min-h-[calc(100vh-400px)] max-h-[calc(100vh-200px)] sm:max-h-[60vh]">
        {videos.length === 0 ? (
          <div className="text-center py-16 text-gray-400 flex flex-col items-center">
            <div className="bg-[#272727] rounded-full p-6 mb-4">
              <MdOutlineInfo className="size-10 text-gray-500" />
            </div>
            <p className="text-lg mb-2 font-medium text-gray-300">
              No videos found
            </p>
            <p className="text-sm text-gray-500 max-w-md">
              Your video library is empty. Start uploading videos to build your
              content collection.
            </p>
            <button onClick={handleUploadVideoPopUp} className="mt-6 bg-gradient-to-r from-[#ae7aff] to-[#8a5fff] hover:from-[#9d6aff] hover:to-[#7946ff] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
              Upload New Video
            </button>
          </div>
        ) : (
          videos.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-700 hover:bg-[#272727] transition-colors group"
            >
              {/* Video Details */}
              <div className="col-span-5 flex gap-4">
                <Link to={`/watch/` + item?._id} className="relative flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={item?.thumbnail}
                    alt="Video Thumbnail"
                    className="w-20 h-12 sm:w-28 sm:h-16 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="bg-white bg-opacity-20 rounded-full p-2">
                      <BiPlay className="text-white text-2xl" />
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-white text-sm sm:text-base line-clamp-1 mb-1 group-hover:text-[#ae7aff] transition-colors">
                    {item?.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                    {item?.description}
                  </p>
                </div>
              </div>

              {/* Visibility */}
              <div className="col-span-2 text-center">
                {item?.isPublished ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 text-green-400 bg-green-400 bg-opacity-10 rounded-full text-xs font-medium">
                    <MdOutlinePublic className="size-3.5 sm:size-4" />
                    <span className="hidden sm:inline">Public</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 text-yellow-400 bg-yellow-400 bg-opacity-10 rounded-full text-xs font-medium">
                    <MdOutlineLock className="size-3.5 sm:size-4" />
                    <span className="hidden sm:inline">Private</span>
                  </span>
                )}
              </div>

              {/* Views */}
              <div className="col-span-2 text-center flex items-center justify-center gap-1.5 text-sm">
                <MdOutlineVisibility className="size-4 text-gray-400" />
                <span className="font-medium">
                  {item?.views?.toLocaleString() || 0}
                </span>
              </div>

              {/* Date */}
              <div className="col-span-2 text-center flex items-center justify-center gap-1.5 text-sm">
                <BiTime className="size-4 text-gray-400" />
                <span className="font-medium">
                  {new Date(item?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Options */}
              <div className="col-span-1 text-center flex justify-center">
                <VideoDropdown video={item} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Loading indicator */}
      {hasMore && (
        <div ref={elementRef} className="text-center py-6 text-gray-400">
          <div className="w-10 h-10 border-t-2 border-[#ae7aff] border-r-2 rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-sm font-medium">Loading more videos...</span>
        </div>
      )}

      {uploadVideoPopUp && <VideoPopUp onClose={() => handleUploadVideoPopUp()} />}
    </div>
  );
};

export default ContentVideo;
