import { useDispatch, useSelector } from "react-redux";
import {
  getSubscribedChannel,
  selectSubscribedChannels,
  toggleSubscription,
} from "../slice/SubscriberSlice";
import { useEffect } from "react";

function SubscribedChannel() {
  const dispatch = useDispatch();
  const subscriberChannels = useSelector(selectSubscribedChannels);

  useEffect(() => {
    dispatch(getSubscribedChannel());
  }, [dispatch]);

  const handleUnsubscribe = async (id) => {
    await dispatch(toggleSubscription({ channelId: id })).unwrap()
    await dispatch(getSubscribedChannel());
  };

  return (
    <div className="w-full h-full text-white">
      <h1 className="p-4 text-3xl font-extrabold border-b-2">
        All subscriptions
      </h1>
      <div>
        {subscriberChannels.map((item, index) => {
          return (
            <div key={index} className="p-4 flex gap-8 justify-between">
              <div className="flex">
                <img src={item.avatar} className="size-32 rounded-full"></img>
                <div className="p-5 flex flex-col gap-4">
                  <h1 className="font-bold text-xl">{item.fullName}</h1>
                  <h1 className="text-gray-400">
                    @{item.userName}{" "}
                    <span className="text-xl font-extrabold">.</span>{" "}
                    {item.subscribers} subscribers{" "}
                  </h1>
                </div>
              </div>
              <div
                className={`p-3 text-black h-fit my-auto font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center bg-slate-400`}
                onClick={() => handleUnsubscribe(item._id)}
              >
                UnSubscribe
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubscribedChannel;
