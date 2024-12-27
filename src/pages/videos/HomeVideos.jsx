import { useEffect, useRef, useState } from "react";
import VideoCard from "../../components/videos/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideos,
  selectCurrentVideos,
  selectCurrentHasMore,
  clearVideoState,
  selectError,
} from "../../app/slices/videoSlice";

function HomeVideos() {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);
  const error = useSelector(selectError);
  const [page, setPage] = useState(1);
  const elementRef = useRef(null);

  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        if (debounceTimeout) clearTimeout(debounceTimeout);
        let time = 0;
        if (error) {
          time = 3000;
        }
        console.log(time);
        // Debounce the dispatch
        const newTimeout = setTimeout(() => {
          dispatch(getVideos({ page, limit: 9 }))
            .unwrap()
            .then(() => {
              setPage((prev) => prev + 1);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Failed to fetch videos:", err);
              setLoading(false);
            });
        }, time);

        setDebounceTimeout(newTimeout);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, hasMore, loading, debounceTimeout, error]);

  useEffect(() => {
    dispatch(clearVideoState());
    setPage(1);
  }, [dispatch]);
  return (
    <div className="w-full flex flex-col items-center justify-end text-white pt-4">
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {videos.map((video, i) => (
          <VideoCard
            key={i}
            thumbnail={video.thumbnail}
            avatar={video.owner.avatar}
            title={video.title}
            views={video.views}
            videoId={video._id}
            createdAt={video.createdAt}
            userName={video?.owner?.userName}
            fullName={video?.owner?.fullName}
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
