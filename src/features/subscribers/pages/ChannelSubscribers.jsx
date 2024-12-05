import { useEffect } from "react";
import {
  selectCurrentChannel,
  setActive,
} from "../../channel/slice/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import SubscriberList from "../components/SubscriberList";
import {
  clearSubscriberState,
  getChannelSubscribers,
  selectChannelSubscriber,
} from "../slice/SubscriberSlice";

function ChannelSubscribers() {
  const dispatch = useDispatch();
  const subscribers = useSelector(selectChannelSubscriber);
  const user = useSelector(selectCurrentChannel);
  useEffect(() => {
    dispatch(setActive([0, 0, 0, 1]));
  }, [dispatch]);
  useEffect(() => {

    if (user) {
      dispatch(clearSubscriberState());
      dispatch(getChannelSubscribers({channelId: user?._id }));
    }
  }, [dispatch, user]);
  return (
    <div>
      <div className="p-4 flex flex-col gap-6">
        {subscribers.map((item, index) => (
          <SubscriberList
            key={index}
            subscribers={0}
            avatar={item.avatar}
            fullname={item.fullName}
          />
        ))}
      </div>
    </div>
  );
}

export default ChannelSubscribers;
