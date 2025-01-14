import {
  FiUsers,
  FiVideo,
  FiThumbsUp,
  FiEye,
  FiTrendingUp,
  FiMessageCircle,
} from "react-icons/fi";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa6";
const DashboardAnalytics = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-zinc-50">
            Analytics Dashboard
          </h1>
          <div className="text-sm text-zinc-400">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Subscribers"
            value="45.3K"
            icon={<FiUsers className="w-5 h-5" />}
          />
          <StatCard
            title="Total Playlists"
            value="24"
            icon={<AiOutlinePlaySquare className="w-5 h-5" />}
          />
          <StatCard
            title="Total Videos"
            value="156"
            icon={<FiVideo className="w-5 h-5" />}
          />
          <StatCard
            title="Total Tweets"
            value="156"
            icon={<FiVideo className="w-5 h-5" />}
          />
          <StatCard
            title="Total Views"
            value="1.2M"
            icon={<FiEye className="w-5 h-5" />}
          />
          <StatCard
            title="Total Videos Likes"
            value="24"
            icon={<AiOutlinePlaySquare className="w-5 h-5" />}
          />
          <StatCard
            title="Total Tweets Likes"
            value="24"
            icon={<FaRetweet className="w-5 h-5" />}
          />
          <StatCard
            title="Total Comments Likes"
            value="24"
            icon={<FaRegCommentDots className="w-5 h-5" />}
          />
        </div>
        {/* Best Performing Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Videos */}
          <div className="bg-zinc-900 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5" />
                Top Performing Videos
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="relative w-32 aspect-video rounded-md overflow-hidden bg-zinc-800">
                      <img
                        src={`/api/placeholder/320/180`}
                        alt="Video thumbnail"
                        className="object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-xs rounded">
                        12:34
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-zinc-100">
                        Amazing Video Title Here
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-zinc-400 mt-1">
                        <div className="flex items-center gap-1">
                          <FiEye className="w-4 h-4" />
                          125K
                        </div>
                        <div className="flex items-center gap-1">
                          <FiThumbsUp className="w-4 h-4" />
                          12K
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Playlists */}
          <div className="bg-zinc-900 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AiOutlinePlaySquare className="w-5 h-5" />
                Top Playlists
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="w-32 aspect-video grid grid-cols-2 gap-0.5 rounded-md overflow-hidden">
                      {[1, 2, 3, 4].map((_, j) => (
                        <div key={j} className="bg-zinc-700/50">
                          <img
                            src={`/api/placeholder/160/90`}
                            alt="Playlist thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-zinc-100">
                        Awesome Playlist Title
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-zinc-400 mt-1">
                        <span>24 videos</span>
                        <span>•</span>
                        <span>10K views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Tweets */}
          <div className="bg-zinc-900 col-span-2 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FiMessageCircle className="w-5 h-5" />
                Top Tweets
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                  >
                    <p className="text-zinc-100 line-clamp-3">
                      Really interesting insight about video creation and the
                      creative process. Thanks for sharing your knowledge!
                      #ContentCreation #VideoTips
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <FiMessageCircle className="w-4 h-4" />
                        234
                      </div>
                      <div className="flex items-center gap-1">
                        <FiThumbsUp className="w-4 h-4" />
                        1.2K
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-zinc-500">
                      Posted 2 days ago
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified Stat Card Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-zinc-900 rounded-xl p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-400">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-zinc-50">{value}</h3>
      </div>
      <div className="p-2 bg-purple-500/10 rounded-full text-purple-400">
        {icon}
      </div>
    </div>
  </div>
);

export default DashboardAnalytics;
