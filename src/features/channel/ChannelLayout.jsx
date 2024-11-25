import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from "../auth/slice/authSlice";
import {
  getChannel,
  selectCurrentChannel,
  selectLoading,
} from "./slice/channelSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";

function ChannelLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channel = useSelector(selectCurrentChannel);
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectLoading);
  const { userName } = useParams();
  const [active, setActive] = useState([1, 0, 0, 0]);
  const [error, setError] = useState(false);
  const sameUser = user?.userName === channel?.userName;
  const activeClass =
    "bg-white h-[60%] text-purple-600 border-b-2 border-purple-500";
  useEffect(() => {
    (async () => {
      const res = await dispatch(getChannel(userName));
      if (res.type === "getChannel/rejected") {
        setError(true);
      }
    })();
  }, [dispatch, userName]);

  const handleTabClick = (index) => {
    const newActive = [0, 0, 0, 0];
    newActive[index] = 1;
    setActive(newActive);
    if (newActive[0] == 1) navigate("Videos");
    if (newActive[1] == 1) navigate("Playlist");
    if (newActive[2] == 1) navigate("Tweets");
    if (newActive[3] == 1 && sameUser) navigate("Subscribed");
  };

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-[#4e4a4a7a] border-4 border-red-500 w-[50%] h-[30%] flex flex-col gap-6 justify-center items-center text-center font-extrabold text-4xl text-red-500">
          unable to get this user
          <CgDanger />
        </div>
      </div>
    );
  }
  return loading ? (
    <div className="w-full h-full flex justify-center text-center items-center font-extrabold text-7xl text-white">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  ) : (
    <div className="h-full mt-[80px] overflow-y-scroll no-scrollbar">
      <div className="h-[45%]">
        <div className="h-[50%] relative">
          <img
            src={channel?.coverImage}
            className="h-full bg-cover object-cover w-full"
          />
        </div>
        <div className="h-[30%] flex justify-between items-center">
          <div className="h-full flex gap-16 items-center ">
            <div className="h-full relative flex justify-center items-center ">
              <img
                src={channel?.avatar}
                className=" bg-cover object-cover size-28 rounded-full -translate-y-8 translate-x-10 "
              />
            </div>
            <div>
              <h2 className="font-semibold text-white text-xl">
                {channel?.fullName}
              </h2>
              <h2 className=" text-white text-lg">@{channel?.userName}</h2>
            </div>
          </div>
        </div>
        <div className="h-[20%] cursor-pointer border-b-2 flex px-10 text-white items-center justify-around">
          <div
            className={`px-24 flex text-center items-center ${
              active[0] === 1 ? activeClass : ""
            }`}
            onClick={() => handleTabClick(0)}
          >
            Videos
          </div>
          <div
            className={`px-24 flex text-center items-center ${
              active[1] === 1 ? activeClass : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            PlayList
          </div>
          <div
            className={`px-24 flex text-center items-center ${
              active[2] === 1 ? activeClass : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            Tweets
          </div>
          <div
            className={`px-24 flex text-center items-center ${
              active[3] === 1 ? activeClass : ""
            }`}
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

export default ChannelLayout;
