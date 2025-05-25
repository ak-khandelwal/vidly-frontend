import { useSelector } from "react-redux";
import { selectActive, selectStats, getChannelStats } from "../app/slices/dashboard";
import { Link, Outlet } from "react-router-dom";
import { TbUpload, TbVideoPlus } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import VideoPopUp from "../components/dashboard/VideoPopUp";
import PlaylistPopup from "../components/dashboard/PlaylistPopup";
import TweetPopUp from "../components/dashboard/TweetPopUp";
import StatsGrid from "../components/dashboard/StatsGrid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const active = useSelector(selectActive);
  const stats = useSelector(selectStats);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [popUps, setPopups] = useState([0, 0, 0]);

  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch]);

  const handleUploadPopup = () => setUploadPopup((prev) => !prev);

  const handlePopUps = (index) => {
    const newArray = [0, 0, 0];
    newArray[index] = popUps[index] === 1 ? 0 : 1;
    setPopups(newArray);
    setUploadPopup(false);
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Stats Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl">Channel Analytics</h1>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleString()}
          </div>
        </div>
        <StatsGrid stats={stats} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className={`${uploadPopup && "hidden sm:block"} mb-4 sm:mb-0`}>
          <h1 className="font-bold text-2xl">Channel Content</h1>
          <p className="text-gray-400 mt-1">
            Seamless video management, elevated results
          </p>
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={handleUploadPopup}
            className="bg-gradient-to-r from-[#8a63d2] to-[#ae7aff] text-black rounded-full py-2.5 px-6 font-bold flex items-center gap-2 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
          >
            Create <TbVideoPlus className="size-5" />
          </button>

          {uploadPopup && (
            <div className="absolute mt-2 right-0 w-full sm:w-64 z-50 rounded-lg overflow-hidden shadow-xl bg-[#1e1e1e] border border-gray-700">
              <div
                className="flex items-center gap-3 p-4 hover:bg-[#272727] cursor-pointer transition-colors"
                onClick={() => handlePopUps(0)}
              >
                <TbUpload className="size-5 text-[#ae7aff]" />
                <span>Upload Video</span>
              </div>
              <div
                className="flex items-center gap-3 p-4 hover:bg-[#272727] cursor-pointer transition-colors"
                onClick={() => handlePopUps(1)}
              >
                <RiPlayListAddFill className="size-5 text-[#ae7aff]" />
                <span>Create Playlist</span>
              </div>
              <div
                className="flex items-center gap-3 p-4 hover:bg-[#272727] cursor-pointer transition-colors"
                onClick={() => handlePopUps(2)}
              >
                <IoCreateOutline className="size-5 text-[#ae7aff]" />
                <span>Post Tweet</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex mb-6 border-b border-gray-700">
        <Link to="videos" className="mr-8">
          <div
            className={`pb-3 px-2 font-medium text-lg relative ${active[0] === 1 ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
          >
            Videos
            {active[0] === 1 && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ae7aff]"></div>
            )}
          </div>
        </Link>
        <Link to="playlists" className="mr-8">
          <div
            className={`pb-3 px-2 font-medium text-lg relative ${active[1] === 1 ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
          >
            Playlists
            {active[1] === 1 && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ae7aff]"></div>
            )}
          </div>
        </Link>
        <Link to="tweets" className="mr-8">
          <div
            className={`pb-3 px-2 font-medium text-lg relative ${active[2] === 1 ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
          >
            Tweets
            {active[2] === 1 && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ae7aff]"></div>
            )}
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {/* Modal popups */}
      {popUps[0] === 1 && <VideoPopUp onClose={() => handlePopUps(0)} />}
      {popUps[1] === 1 && <PlaylistPopup onClose={() => handlePopUps(1)} />}
      {popUps[2] === 1 && <TweetPopUp onClose={() => handlePopUps(2)} />}
    </div>
  );
};

export default DashboardContent;
