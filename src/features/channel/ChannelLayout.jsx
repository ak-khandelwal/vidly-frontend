import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ChannelLayout() {
  const [active, setActive] = useState([1,0,0,0]);
  const navigate = useNavigate();
  const activeClass =
    "bg-white h-[60%] text-purple-600 border-b-2 border-purple-500";
    const handleTabClick = (index) => {
      const newActive = [0, 0, 0, 0];
      newActive[index] = 1;
      setActive(newActive);
      if(newActive[0] == 1) navigate("Videos")
      if(newActive[1] == 1) navigate("Playlist")
      if(newActive[2] == 1) navigate("Tweets")
      if(newActive[3] == 1) navigate("Subscribed")
    };
  return (
    <div className="h-full mt-[80px] overflow-y-scroll no-scrollbar">
      <div className="h-[45%]">
        <div className="bg-slate-500 h-[50%]"></div>
        <div className="h-[30%] flex justify-between items-center">
          <div className="h-full flex gap-16 items-center ">
            <div className="bg-pink-300 size-32 rounded-full -translate-y-14 translate-x-10"></div>
            <div>
              <h2 className="font-semibold text-white text-xl">fullName</h2>
              <h2 className=" text-white text-lg">@userName</h2>
            </div>
          </div>
          <div className="w-32 h-[40%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center mr-9 select-none">
            View Channel
          </div>
        </div>
        <div className="h-[20%] border-b-2 flex px-10 text-white items-center justify-around">
          <div
            className={`px-28 flex text-center items-center ${active[0] === 1 ? activeClass: ""}`}
            onClick={() => handleTabClick(0)}
          >
            Videos
          </div>
          <div
            className={`px-28 flex text-center items-center ${active[1] === 1 ? activeClass: ""}`}
            onClick={() => handleTabClick(1)}
          >
            PlayList
          </div>
          <div
            className={`px-28 flex text-center items-center ${active[2] === 1 ? activeClass: ""}`}
            onClick={() => handleTabClick(2)}
          >
            Tweets
          </div>
          <div
            className={`px-28 flex text-center items-center ${active[3] === 1 ? activeClass: ""}`}
            onClick={() => handleTabClick(3)}
          >
            Subscribed
          </div>
        </div>
      </div>
      <div className="h-[55%] text-white">
        <Outlet />
      </div>
    </div>
  );
}

export default ChannelLayout