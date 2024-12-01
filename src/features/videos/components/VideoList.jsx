const VideoList = (({ thumbnail, title, description, views }) => (
  <div className="video-card flex flex-col justify-center items-center w-full" >
    <img
      src={thumbnail}
      alt="Video Thumbnail"
      className="w-80 h-44"
    />
    <div className="mt-2 w-80 flex gap-2">
       <img
      src={thumbnail}
      alt="Video Thumbnail"
      className="size-10 rounded-full"
    />
     <div className="">
     <h3 className="text-lg font-semibold truncate">{title}</h3>
     <p className="text-sm text-gray-500 truncate">{description}</p>
      <p className="text-sm text-gray-500 truncate">{views} views</p>
     </div>
    </div>
  </div>
));
export default VideoList;
