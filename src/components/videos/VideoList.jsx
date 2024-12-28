import { HiOutlineDotsVertical } from "react-icons/hi";
import { timeAgo } from "../../helpers/timeAgo";
import { Link } from "react-router-dom";

const VideoList = ({
  videoId,
  thumbnail,
  avatar,
  title,
  description,
  views,
  channalName,
  createdAt,
}) => {
  const time = timeAgo(createdAt);
  return (
    <div className="flex">
      <Link to={"/watch/" + videoId} className="flex gap-8 w-full">
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          className="w-[34rem] h-[19rem] rounded-md object-cover"
        />
        <div className="h-full flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{views} views . {time}</p>
          </div>
          <div className="flex gap-4">
            <img
              src={avatar}
              alt="Video Thumbnail"
              className="w-10 rounded-full"
            />
            <h1 className=""> {channalName}</h1>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </Link>
      <HiOutlineDotsVertical />
    </div>
  );
};
export default VideoList;
