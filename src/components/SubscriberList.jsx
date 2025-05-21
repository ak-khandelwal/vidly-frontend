import { Link } from "react-router-dom";

function SubscriberList({
  avatar,
  fullname,
  userName,
  subscribers,
  channelId,
  subscribed,
  handleSubscribe,
  currentUserId,
}) {

  return (
    <div className="w-full h-[31%] flex justify-between m-4">
      <div className="flex gap-5">
        <Link to={`/Channel/${userName}`}>
          <img src={avatar} alt="logo" className="size-9 rounded-full" />
        </Link>
        <div>
          <div>{fullname}</div>
          <div>{subscribers} subscribers</div>
        </div>
      </div>
      {channelId === currentUserId ? (
        <Link
          to={`/channel/${userName}`}
          className="px-4 text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center bg-[#ae7aff]"
        >
          View Channel
        </Link>
      ) : (
        <div
          className={`px-4 text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center ${
            !subscribed ? "bg-[#ae7aff]" : "bg-slate-400"
          } `}
          onClick={(e) => handleSubscribe(e, channelId)}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </div>
      )}
    </div>
  );
}

export default SubscriberList;
