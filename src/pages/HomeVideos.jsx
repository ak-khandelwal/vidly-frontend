import { useEffect, useRef, useState } from "react";
import VideoCard from "../components/videos/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideos,
  selectCurrentVideos,
  selectCurrentHasMore,
  clearVideoState,
  selectError,
} from "../app/slices/videoSlice";
import { IoRefreshCircleOutline } from "react-icons/io5";

function HomeVideos() {
  const dispatch = useDispatch();
  const videos = useSelector(selectCurrentVideos);
  const hasMore = useSelector(selectCurrentHasMore);
  const error = useSelector(selectError);
  const [page, setPage] = useState(1);
  const elementRef = useRef(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  // Get user tags from auth state
  const userTags = useSelector((state) => state.auth.user?.tags || []);
  const [categories, setCategories] = useState([
    { name: "All", active: true },
  ]);

  // Update categories when userTags change
  useEffect(() => {
    if (userTags && userTags.length > 0) {
      setCategories([
        { name: "All", active: true },
        ...userTags.map(tag => ({ name: tag.name, active: false }))
      ]);
    }
  }, [userTags]);

  const handleCategoryClick = (clickedIndex) => {
    setCategories(
      categories.map((category, index) => ({
        ...category,
        active: index === clickedIndex,
      })),
    );

    // Get the selected category name
    const selectedCategory = categories[clickedIndex].name;
    const tag = selectedCategory === "All" ? null : selectedCategory;

    // Here you would usually filter videos by category
    dispatch(clearVideoState());
    setPage(1);
  };

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
        // Get the active category
        const activeCategory = categories.find(cat => cat.active);
        const tag = activeCategory.name === "All" ? null : activeCategory.name;

        // Debounce the dispatch
        const newTimeout = setTimeout(() => {
          dispatch(getVideos({ page, limit: 12, tag }))
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
  }, [dispatch, page, hasMore, loading, debounceTimeout, error, categories]);

  useEffect(() => {
    dispatch(clearVideoState());
    setPage(1);
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearVideoState());
    setPage(1);
    dispatch(getVideos({ page: 1, limit: 9 }));
  };

  return (
    <div className="w-full flex flex-col text-white">
      {/* Categories horizontal scrollbar */}
      <div className="mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(index)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all
                ${category.active
                  ? "bg-white text-black font-medium"
                  : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Videos grid */}
      {videos.length > 0 ? (
        <div className="w-full grid grid-cols-1 gap-6 sm:gap-x-4 sm:gap-y-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-zinc-400 mb-4">
            Failed to load videos. Please try again.
          </div>
          <button
            onClick={handleRetry}
            className="flex items-center px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <IoRefreshCircleOutline className="mr-2" />
            Retry
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-zinc-700 h-10 w-10"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-700 rounded"></div>
                <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {hasMore && (
        <div ref={elementRef} className="py-6 flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeVideos;
