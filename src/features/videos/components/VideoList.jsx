const VideoList = (({ thumbnail, title, description }) => (
  <div className="video-card m-2 w-80" >
    <img
      src={thumbnail}
      alt="Video Thumbnail"
      className="w-full h-44 rounded-lg bg-white"
    />
    <div className="mt-2">
      <h3 className="text-lg font-semibold truncate">{title}</h3>
      <p className="text-sm text-gray-500 truncate">{description}</p>
    </div>
  </div>
));
export default VideoList;
