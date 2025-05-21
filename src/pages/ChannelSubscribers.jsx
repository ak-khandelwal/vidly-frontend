import { useEffect } from "react";
import { selectCurrentChannel, setActive } from "../app/slices/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import SubscriberList from "../components/SubscriberList";
import {
  clearSubscriberState,
  getChannelSubscribers,
  selectChannelSubscriber,
  toggleSubscription,
} from "../app/slices/SubscriberSlice";
import { selectCurrentUser } from "../app/slices/authSlice";

function ChannelSubscribers() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentChannel);
  const subscribers = useSelector(selectChannelSubscriber);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      dispatch(getChannelSubscribers({ channelId: user?._id }));
    }
  }, [dispatch, user]);

  const handleSubscribe = async (e, channelId) => {
    e.preventDefault();

    try {
      await dispatch(toggleSubscription({ channelId })).unwrap();
      await dispatch(getChannelSubscribers({ channelId: user._id }));
    } catch (error) {
      console.error("Error handling subscription:", error);
    }
  };
  useEffect(() => {
    dispatch(setActive([0, 0, 0, 1]));
    dispatch(clearSubscriberState());
  }, [dispatch]);

  return (
    <div className="p-4 pr-8 flex flex-col gap-6">
      {subscribers.map((item, index) => (
        <SubscriberList
          key={index}
          subscribers={item?.subscriberCount}
          avatar={item?.avatar}
          fullname={item?.fullName}
          userName={item?.userName}
          subscribed={item?.isSubscribed}
          channelId={item?._id}
          handleSubscribe={handleSubscribe}
          currentUserId={currentUser?._id}
        />
      ))}
    </div>
  );
}

export default ChannelSubscribers;
