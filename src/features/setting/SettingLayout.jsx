import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../auth/slice/authSlice";
function SettingLayout() {
  const [active, setActive] = useState([1, 0]);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const activeClass =
    "bg-white h-[60%] text-purple-600 border-b-2 border-purple-500";
    const handleTabClick = (index) => {
      const newActive = [0, 0];
      newActive[index] = 1;
      setActive(newActive);
      if(newActive[1] == 1) navigate("ChangePassword")
      if(newActive[0] == 1) navigate("ChangeInfo")
    };
  return (
    <div className="h-full mt-[80px] overflow-y-scroll no-scrollbar">
      <div className="h-[45%]">
        <img className="bg-slate-500 h-[50%]">

        </img>
        <div className="h-[30%] flex justify-between items-center">
          <div className="h-full flex gap-16 items-center ">
            <div className="bg-pink-300 size-32 rounded-full -translate-y-14 translate-x-10"></div>
            <div>
              <h2 className="font-semibold text-white text-xl">
                @{user.fullName}
              </h2>
              <h2 className=" text-white text-lg">
                @{user.userName}
              </h2>
            </div>
          </div>
          <Link to="/Channel"  className="h-full flex justify-between items-center">
          <div className="w-32 h-[40%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center mr-9 select-none">
            View Channel
          </div>
          </Link>
        </div>
        <div className="h-[20%] border-b-2 flex px-10 text-white items-center justify-around">
          <div
            className={`px-32 flex text-center items-center ${active[0] === 1 ? activeClass: ""}`}
            onClick={() => handleTabClick(0)}
          >
            Personal information
          </div>
          <div
            className={`px-32 flex text-center items-center ${active[1] === 1 ? activeClass: ""}`}
            onClick={() => handleTabClick(1)}
          >
            Change password
          </div>
        </div>
      </div>
      <div className="h-[55%] text-white">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingLayout;
