import {
  FiUsers,
  FiVideo,
  FiThumbsUp,
  FiEye,
} from "react-icons/fi";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa6";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-purple-500/50 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Subscribers"
        value={stats.subscribersCount.toLocaleString()}
        icon={<FiUsers className="w-5 h-5" />}
      />
      <StatCard
        title="Total Playlists"
        value={stats.playlistsCount.toLocaleString()}
        icon={<AiOutlinePlaySquare className="w-5 h-5" />}
      />
      <StatCard
        title="Total Videos"
        value={stats.totalVideos.toLocaleString()}
        icon={<FiVideo className="w-5 h-5" />}
      />
      <StatCard
        title="Total Tweets"
        value={stats.tweetsCount.toLocaleString()}
        icon={<FaRetweet className="w-5 h-5" />}
      />
      <StatCard
        title="Total Views"
        value={stats.totalViews.toLocaleString()}
        icon={<FiEye className="w-5 h-5" />}
      />
      <StatCard
        title="Total Video Likes"
        value={stats.totalVideosLikes.toLocaleString()}
        icon={<FiThumbsUp className="w-5 h-5" />}
      />
      <StatCard
        title="Total Tweet Likes"
        value={stats.totalTweetsLikes.toLocaleString()}
        icon={<FaRetweet className="w-5 h-5" />}
      />
      <StatCard
        title="Total Comments"
        value={stats.totalCommentsLikes.toLocaleString()}
        icon={<FaRegCommentDots className="w-5 h-5" />}
      />
    </div>
  );
};

export default StatsGrid; 