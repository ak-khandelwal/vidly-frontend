import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, selectHistory } from "../app/slices/authSlice";
import VideoList from "../components/videos/VideoList";
import { MdOutlineHistory, MdOutlineInfo } from "react-icons/md";

function History() {
  const dispatch = useDispatch();
  const videos = useSelector(selectHistory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getHistory())
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="flex items-center gap-3 border-b border-gray-700 py-4 mb-6">
        <MdOutlineHistory className="text-purple-400 size-7" />
        <h1 className="text-2xl sm:text-3xl font-bold">Your Watch History</h1>
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
          <button className="mt-6 bg-gradient-to-r from-[#ae7aff] to-[#8a5fff] hover:from-[#9d6aff] hover:to-[#7946ff] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
            Explore Videos
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {videos.map((video, index) => (
            <VideoList
              key={index}
              thumbnail={video?.thumbnail}
              avatar={video?.owner?.avatar}
              title={video?.title}
              description={video?.description}
              videoId={video._id}
              views={video?.views}
              channalName={video?.owner?.userName}
              createdAt={video?.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
