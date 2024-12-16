import { Link } from "react-router-dom";

const VideoList = ({
  videoId,
  thumbnail,
  avatar,
  title,
  description,
  views,
  channalName,
}) => (
  <Link
    to={"/watch/" + videoId}
    className="video-card flex gap-8 items-center w-full"
  >
    <img
      src={thumbnail}
      alt="Video Thumbnail"
      className="w-[30rem] h-[15rem] object-cover"
    />
    <div className="mt-2 w-80 flex flex-col gap-2 h-full">
      <div className="">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{views} views</p>
      </div>
      <div className="flex gap-4">
        <img
          src={avatar}
          alt="Video Thumbnail"
          className="size-10 rounded-full"
        />
        <h1 className=""> {channalName}</h1>
      </div>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
  </Link>
);
export default VideoList;
