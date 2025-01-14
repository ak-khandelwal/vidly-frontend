import { useEffect, useRef, useState } from "react";
import VideoCard from "../components/videos/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVideoState,
  getVideos,
  selectCurrentVideos,
  selectCurrentHasMore,
} from "../app/slices/videoSlice";
import { selectCurrentChannel, setActive } from "../app/slices/channelSlice";

function ChannelVideos() {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);
  const user = useSelector(selectCurrentChannel);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(clearVideoState());
      setPage(1);
    }
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(setActive([1, 0, 0, 0]));
  }, [dispatch]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 1.0 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, user, hasMore, loading]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-end p-4">
      <div className="w-full h-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {videos.map((video, i) => (
          <VideoCard
            key={i}
            title={video.title}
            videoId={video._id}
            createdAt={video.createdAt}
            views={video.views}
            thumbnail={video?.thumbnail}
            avatar={video?.owner?.avatar}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={elementRef} className="text-center py-4">
          Loading more videos...
        </div>
      )}
    </div>
  );
}

export default ChannelVideos;
