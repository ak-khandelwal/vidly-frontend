import { useEffect, useRef, useState } from "react";
import VideoList from "../components/VideoList";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserVideos,
  selectCurrentVideos,
  selectCurrentHasMore,
  clearVideoState,
} from "../slice/videoSlice";
import { selectCurrentChannel } from "../../channel/slice/channelSlice";

function HomeVideos() {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);
  const user = useSelector(selectCurrentChannel);

  const [page, setPage] = useState(1); // Tracks current page
  const [loading, setLoading] = useState(false)
  const elementRef = useRef(null);

  // Fetch videos when the observer detects the element
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          setLoading(true)
          dispatch(getUserVideos({ page, limit: 6 }))
            .unwrap()
            .then(() => {
              setPage((prev) => prev + 1); // Increment page on success
              setLoading(false)
            })
            .catch((err) => {
              console.error("Failed to fetch videos:", err);
              setLoading(false)
            });
        }
      },
      { threshold: 1.0 } // Trigger when the element is fully visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, hasMore, loading]);
  useEffect(() => {
    if (user) {
      dispatch(clearVideoState());
      setPage(1); // Reset pagination
    }
  }, [dispatch, user]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-end text-white mt-4">
      <div className="w-full h-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {videos.map((video,i) => (
          <VideoList
            key={i} // Use a unique identifier for better rendering
            thumbnail={video.thumbnail}
            avatar={video.owner.avatar}
            description={video.description}
            title={video.title}
            views={video.views}
            videoId={video._id}
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

export default HomeVideos;
