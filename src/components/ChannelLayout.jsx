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
import { toggleSubscription } from "../app/slices/SubscriberSlice";
import { selectCurrentUser } from "../app/slices/authSlice";

function ChannelLayout() {
  const dispatch = useDispatch();
  const channel = useSelector(selectCurrentChannel);
  const loading = useSelector(selectLoading);
  const active = useSelector(selectActive);
  const { userName } = useParams();
  const [error, setError] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const activeClass =
    "bg-white p-2 text-purple-600 border-b-2 border-purple-500 font-medium";
  const inactiveClass = "p-2 hover:bg-zinc-800 transition-colors";

  useEffect(() => {
    (async () => {
      const res = await dispatch(getChannel(userName));
      if (res.type === "getChannel/rejected") {
        setError(true);
      }
    })();
  }, [dispatch, userName]);

  const handleSubscribe = async () => {
    await dispatch(toggleSubscription({ channelId: channel?._id }));
    dispatch(getChannel(userName));
  };

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center py-8">
        <div className="bg-zinc-800 border-2 border-red-500 rounded-lg w-full max-w-md p-8 flex flex-col gap-6 justify-center items-center text-center font-bold text-2xl text-red-500">
          <span>Unable to get this user</span>
          <CgDanger className="text-4xl" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl text-purple-500" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Cover Image Section */}
      <div className="relative">
        <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
          <img
            src={channel?.coverImage}
            alt={`${channel?.fullName}'s cover`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="relative px-4 sm:px-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16">
            {/* Avatar */}
            <div className="flex justify-start">
              <img
                src={channel?.avatar}
                alt={channel?.fullName}
                className="size-24 sm:size-32 rounded-full border-4 border-zinc-900 bg-zinc-900 object-cover"
              />
            </div>

            {/* Channel Info */}
            <div className="pt-2 sm:pb-2 flex items-center justify-between w-full">
              <div>
                <h2 className="font-bold text-xl sm:text-2xl">
                  {channel?.fullName}
                </h2>
                <h3 className="text-zinc-400 text-sm sm:text-base">
                  @{channel?.userName}
                </h3>
              </div>
              {channel?._id === currentUser?._id ? (
                <Link
                  to={`/channel/${currentUser?.userName}`}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#8a63d2] to-[#ae7aff] text-black font-bold rounded-full hover:opacity-90 transition-opacity"
                >
                  View Channel
                </Link>
              ) : (
                <button
                  className={`px-6 py-2.5 rounded-full font-bold transition-colors ${
                    !channel?.isSubscribed
                      ? "bg-gradient-to-r from-[#8a63d2] to-[#ae7aff] text-black"
                      : "bg-[#323232] text-white border border-gray-600"
                  }`}
                  onClick={handleSubscribe}
                >
                  {channel?.isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-zinc-800 mb-4">
        <div className="flex overflow-x-auto no-scrollbar">
          <nav className="flex w-full px-2 sm:px-8 gap-2 sm:gap-4">
            <Link to="Videos" className="whitespace-nowrap">
              <div className={active[0] === 1 ? activeClass : inactiveClass}>
                Videos
              </div>
            </Link>
            <Link to="PlayList" className="whitespace-nowrap">
              <div className={active[1] === 1 ? activeClass : inactiveClass}>
                Playlists
              </div>
            </Link>
            <Link to="Tweets" className="whitespace-nowrap">
              <div className={active[2] === 1 ? activeClass : inactiveClass}>
                Tweets
              </div>
            </Link>
            <Link to="Subscribed" className="whitespace-nowrap">
              <div className={active[3] === 1 ? activeClass : inactiveClass}>
                Subscribers
              </div>
            </Link>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default ChannelLayout;
