import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, selectHistory, selectHistoryPagination } from "../app/slices/authSlice";
import { clearWatchHistory } from "../app/slices/authSlice";
import VideoList from "../components/videos/VideoList";
import { MdOutlineHistory, MdOutlineInfo, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function History() {
  const dispatch = useDispatch();
  const videos = useSelector(selectHistory);
  const pagination = useSelector(selectHistoryPagination);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    dispatch(getHistory({ page: currentPage, limit }))
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleClearHistory = async () => {
    try {
      await dispatch(clearWatchHistory()).unwrap();
      // Refresh the history list
      dispatch(getHistory({ page: 1, limit }));
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  return (
    <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="flex items-center justify-between border-b border-gray-700 py-4 mb-6">
        <div className="flex items-center gap-3">
          <MdOutlineHistory className="text-purple-400 size-7" />
          <h1 className="text-2xl sm:text-3xl font-bold">Your Watch History</h1>
        </div>
        {videos.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <MdOutlineDelete className="size-5" />
            <span>Clear all history</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-16 text-gray-400 flex flex-col items-center">
          <div className="bg-[#272727] rounded-full p-6 mb-4">
            <MdOutlineInfo className="size-10 text-gray-500" />
          </div>
          <p className="text-lg mb-2 font-medium text-gray-300">
            No watch history found
          </p>
          <p className="text-sm text-gray-500 max-w-md">
            Videos you watch will appear here. Explore some videos to start
            building your watch history.
          </p>
          <Link to={'/'} className="mt-6 bg-gradient-to-r from-[#ae7aff] to-[#8a5fff] hover:from-[#9d6aff] hover:to-[#7946ff] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
            Explore Videos
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {videos.map((historyItem) => (
              <VideoList
                key={historyItem._id}
                thumbnail={historyItem.video?.thumbnail}
                avatar={historyItem.video?.owner?.avatar}
                title={historyItem.video?.title}
                description={historyItem.video?.description}
                videoId={historyItem.video?._id}
                views={historyItem.video?.views}
                channalName={historyItem.video?.owner?.userName}
                createdAt={historyItem.watchedAt}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-[#272727] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333333] transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="px-4 py-2 rounded-lg bg-[#272727] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333333] transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default History;
