import { useDispatch, useSelector } from "react-redux";
import {
  getSubscribedChannel,
  selectSubscribedChannels,
  toggleSubscription,
} from "../app/slices/SubscriberSlice";
import { useEffect, useState } from "react";
import { MdOutlineSubscriptions, MdOutlineInfo } from "react-icons/md";

function SubscribedChannel() {
  const dispatch = useDispatch();
  const subscriberChannels = useSelector(selectSubscribedChannels);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getSubscribedChannel())
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const handleUnsubscribe = async (id) => {
    try {
      await dispatch(toggleSubscription({ channelId: id })).unwrap();
      await dispatch(getSubscribedChannel());
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
    }
  };

  return (
    <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="flex items-center gap-3 border-b border-gray-700 py-4 mb-6">
        <MdOutlineSubscriptions className="text-purple-400 size-7" />
        <h1 className="text-2xl sm:text-3xl font-bold">Your Subscriptions</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : subscriberChannels.length === 0 ? (
        <div className="text-center py-16 text-gray-400 flex flex-col items-center">
          <div className="bg-[#272727] rounded-full p-6 mb-4">
            <MdOutlineInfo className="size-10 text-gray-500" />
          </div>
          <p className="text-lg mb-2 font-medium text-gray-300">
            No subscriptions found
          </p>
          <p className="text-sm text-gray-500 max-w-md">
            Channels you subscribe to will appear here. Discover creators and
            subscribe to start building your feed.
          </p>
          <button className="mt-6 bg-gradient-to-r from-[#ae7aff] to-[#8a5fff] hover:from-[#9d6aff] hover:to-[#7946ff] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
            Discover Channels
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subscriberChannels.map((channel, index) => (
            <div
              key={index}
              className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors group p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
                  <img
                    src={channel.avatar}
                    alt={channel.fullName}
                    className="size-20 sm:size-16 rounded-full object-cover border-2 border-gray-700"
                  />
                  <div className="flex flex-col items-center sm:items-start gap-2">
                    <h2 className="font-bold text-lg group-hover:text-[#ae7aff] transition-colors">
                      {channel.fullName}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <span>@{channel.userName}</span>
                      <span className="text-xs mx-1">•</span>
                      <span>
                        {channel.subscribers?.toLocaleString() || 0} subscribers
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 hidden sm:block">
                      {channel.description || "No channel description"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleUnsubscribe(channel._id)}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 min-w-32 text-center"
                >
                  Unsubscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubscribedChannel;
