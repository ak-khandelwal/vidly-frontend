import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideos,
  selectCurrentVideos,
  selectCurrentHasMore,
  clearVideoState,
} from "../app/slices/videoSlice";
import VideoList from "../components/videos/VideoList";

function SearchVideo() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          setLoading(true);
          dispatch(getVideos({ query:searchParams, page:page, limit:9}))
            .unwrap()
            .then(() => {
              setPage((prev) => prev + 1); // Increment page on success
              setLoading(false);
            })
            .catch((err) => {
              console.error("Failed to fetch videos:", err);
              setLoading(false);
            });
        }
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, hasMore, loading, searchParams]);

  useEffect(() => {
      dispatch(clearVideoState());
      setPage(1); // Reset pagination
  }, [dispatch, searchParams]);

  return (
    <div className="w-full h-full flex flex-col p-8 text-white">
      <div className="gap-8 grid grid-cols-1">
        {videos.map((video, i) => (
          <VideoList
            key={i} // Use a unique identifier for better rendering
            thumbnail={video.thumbnail}
            avatar={video.owner.avatar}
            description={video.description}
            title={video.title}
            views={video.views}
            videoId={video._id}
            channalName={video.owner.fullName}
            createdAt={video?.createdAt}
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

export default SearchVideo;
