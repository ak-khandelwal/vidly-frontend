import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import {
  getChannel,
  selectActive,
  selectCurrentChannel,
  selectLoading,
} from "../app/slices/channelSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";

function ChannelLayout() {
  const dispatch = useDispatch();
  const channel = useSelector(selectCurrentChannel);
  const loading = useSelector(selectLoading);
  const active = useSelector(selectActive)
  const { userName } = useParams();
  const [error, setError] = useState(false);
  const activeClass =
    "bg-white p-1 text-purple-600 border-b-2 border-purple-500";
  useEffect(() => {
    (async () => {
      const res = await dispatch(getChannel(userName));
      if (res.type === "getChannel/rejected") {
        setError(true);
      }
    })();
  }, [dispatch, userName]);

  if (error) {
    return (
      <div className="w-full h-full flex justify-center bg-white items-center">
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
    <div className="h-full overflow-y-scroll no-scrollbar">
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
          <Link to={"Videos"}>
          <div
            className={`px-24 flex text-center items-center ${
              active[0] === 1 ? activeClass : ""
              }`}
              >
            Videos
          </div>
          </Link>
          <Link to={"PlayList"}>
          <div
            className={`px-24 flex text-center items-center ${
              active[1] === 1 ? activeClass : ""
              }`}
              >
            PlayList
          </div>
          </Link>
          <Link to={"Tweets"}>
          <div
            className={`px-24 flex text-center items-center ${
              active[2] === 1 ? activeClass : ""
              }`}
              >
            Tweets
          </div>
          </Link>
          <Link to={"Subscribed"}>
          <div
            className={`px-24 flex text-center items-center ${
              active[3] === 1 ? activeClass : ""
              }`}
              >
            Subscribed
          </div>
          </Link>
        </div>
      </div>
      <div className="text-white">
        <Outlet />
      </div>
    </div>
  );
}

export default ChannelLayout;
