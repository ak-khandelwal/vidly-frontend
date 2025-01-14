import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/slices/dashboard";
import {
  clearVideoState,
  getVideos,
  selectCurrentHasMore,
  selectCurrentVideos,
} from "../../app/slices/videoSlice";
import { selectCurrentUser } from "../../app/slices/authSlice";
import VideoDropdown from "./VideoDropDown";

const ContentVideo = () => {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);
  const user = useSelector(selectCurrentUser);

  const [page, setPage] = useState(1); // Tracks current page
  const [loading, setLoading] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(clearVideoState());
      setPage(1);
    }
  }, [dispatch, user]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        dispatch(getVideos({ userId: user?._id, page, limit: 6 }))
          .unwrap()
          .then(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch videos:", err);
            setLoading(false);
          });
      }
      if (!hasMore) setPage(1);
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, user, hasMore, loading]);
  useEffect(() => {
    dispatch(setActive([1, 0, 0]));
  }, [dispatch]);
  return (
    <div className="overflow-x-auto">
      <div className="flex w-[240%] sm:w-full p-4">
        <div className="w-[22rem] sm:w-[28rem]">Videos</div>
        <div className="w-[12rem]">Visibility</div>
        <div className="w-[12rem]">Views</div>
        <div className="w-[10rem]">Date</div>
        <div className="">options</div>
      </div>
      <div>
        {videos.map((item, index) => (
          <div
            key={index}
            className="flex items-center w-[240%] sm:w-full p-4 border-b border-gray-700"
          >
            {/* Video Details */}
            <div className="flex gap-4 w-[28rem] sm:w-[30rem] items-start">
              <div className="relative">
                <img
                  src={item?.thumbnail}
                  alt="Video Thumbnail"
                  className="w-[10rem] h-[5rem] sm:w-[11rem] sm:h-[6rem] object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1
                  className="text-lg font-semibold text-white line-clamp-2 text-ellipsis max-w-[10rem] sm:max-w-[16rem]"
                  title={item?.title}
                >
                  {item?.title}
                </h1>
                <p
                  className="text-sm text-gray-400 overflow-hidden text-ellipsis line-clamp-2 max-w-[10rem] sm:max-w-[16rem]"
                  title={item?.description}
                >
                  {item?.description}
                </p>
              </div>
            </div>

            {/* Visibility */}
            <div className="w-[6rem]">
              {item?.isPublished ? (
                <span className="px-4 py-1 text-green-400 border border-green-400 rounded-full text-sm">
                  Published
                </span>
              ) : (
                <span className="px-4 py-1 text-red-400 border border-red-400 rounded-full text-sm">
                  UnPublished
                </span>
              )}
            </div>

            {/* Views */}
            <div className="w-[12rem] text-center">{item?.views || 0}</div>

            {/* Date */}
            <div className="w-[15rem] text-center">
              {new Date(item?.createdAt).toLocaleDateString()}
            </div>

            {/* Options */}
            <div>
              <VideoDropdown video={item} setPage={setPage} />
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={elementRef} className="text-center w-full py-4">
          Loading more videos...
        </div>
      )}
    </div>
  );
};
export default ContentVideo;
