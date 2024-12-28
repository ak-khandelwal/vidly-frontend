import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, selectHistory } from "../app/slices/authSlice";
import VideoList from "../components/videos/VideoList";
function History() {
  const dispatch = useDispatch();
  const videos = useSelector(selectHistory);
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <div className="text-white ">
      <h1 className="p-4 text-3xl font-extrabold border-b-2">
        Your History
      </h1>
    <div className="flex flex-col gap-6">
      {videos.map((video, index) => {
        return <div key={index} className="">
          <VideoList
            thumbnail={video?.thumbnail}
            avatar={video?.owner?.avatar}
            title={video?.title}
            description={video?.description}
            videoId={video._id}
            views={video?.views}
            channalName={video?.owner?.userName}
            createdAt={video?.createdAt}
          />
        </div>;
      })}
    </div>
    </div>
  );
}

export default History;
