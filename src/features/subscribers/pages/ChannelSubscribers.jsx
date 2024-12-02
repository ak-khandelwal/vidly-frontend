import { useEffect } from "react";
import { setActive } from "../../channel/slice/channelSlice";
import { useDispatch } from "react-redux";

function ChannelSubscribers() {
  const dispatch = useDispatch();
 useEffect(()=>{
    dispatch(setActive([0,0,0,1]));
  },[dispatch])
  return (
    <div>ChannelSubscribers</div>
  )
}

export default ChannelSubscribers