import { timeAgo } from "../../helpers/timeAgo";
function TweetsList({ avatar, fullname, content, createdAt }) {
  const time = timeAgo(createdAt);
  return (
    <div className="h-[20%] w-full flex border-b border-gray-300 gap-4">
      <img src={avatar} className="size-10 rounded-full" />
      <div>
        <span className="flex gap-20">
          <h2>{fullname}</h2>
          <h2>{time}</h2>
        </span>
        <p className="text-wrap max-w-[70%]">{content}</p>
      </div>
    </div>
  );
}

export default TweetsList;
