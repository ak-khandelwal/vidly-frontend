import { FiMessageCircle, FiThumbsUp } from "react-icons/fi";
import { timeAgo } from "../../helpers/timeAgo";
function TweetsList({ avatar, fullname, username, content, createdAt }) {
  const time = timeAgo(createdAt);
  return (
    <div className="flex p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
      <div className="w-[5%] h-full">
        <img src={avatar} className="size-10 rounded-full" />
      </div>
      <div className="">
        <div className="flex gap-4">
          <p className="text-zinc-100 capitalize font-bold line-clamp-3">{fullname}</p>
          <p className="text-zinc-400 line-clamp-3">@{username}</p>
        </div>
        <p className="text-zinc-100 line-clamp-3">{content}</p>
        <div className="mt-2 text-xs text-zinc-500">Posted {time}</div>
      </div>
    </div>
  );
}

export default TweetsList;
