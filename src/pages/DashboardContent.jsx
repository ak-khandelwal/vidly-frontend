import { useSelector } from "react-redux";
import { selectActive } from "../app/slices/dashboard";
import { Link, Outlet } from "react-router-dom";
import { TbVideoPlus } from "react-icons/tb";
const DashboardContent = () => {
  const active = useSelector(selectActive);
  const activeClass = " border-x-2 px-9 border-purple-400 bg-[#5e3f65b4] ";
  return (
    <div>
      <div className="flex justify-between mb-10">
        <div>
          <h1 className="font-bold text-xl">Channel content</h1>
          <p className="text-gray-200">
            Seamless Video Management, Elevated Results.
          </p>
        </div>
        <button className=" bg-[#b66fdfbe] rounded-md shadow-[#998c8c7d] shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1    p-2 sm:mr-14 mt-4 flex font-bold text-lg sm:text-xl justify-center items-center gap-1">
          Create <TbVideoPlus className=" size-8 sm:size-10" />
        </button>
      </div>
      <div className="flex gap-4 sm:gap-10 font-bold text-xl overflow-x-auto">
        <Link to={"videos"}>
          <div className={`px-9 ${active[0] === 1 ? activeClass : ""}`}>
            Video
          </div>
        </Link>
        <Link to={"playlists"}>
          <div className={`px-9 ${active[1] === 1 ? activeClass : ""}`}>
            Playlist
          </div>
        </Link>
        <Link to={"tweets"}>
          <div className={`px-9 ${active[2] === 1 ? activeClass : ""}`}>
            Tweets
          </div>
        </Link>
      </div>
      <div className="border-t-2 mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardContent;
