import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/slices/authSlice";

function DashBoardSideBar({ defaultCollapsed = true, onToggle }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  // Update parent component when sidebar state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed);
    }
  }, [collapsed, onToggle]);

  const isActive = (path) => {
    const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments
    return pathSegments.includes(path);
  };

  const itemsList1 = [
    {
      icon: isActive("/") ? (
        <IoHome className="size-5" />
      ) : (
        <IoHomeOutline className="size-5" />
      ),
      name: "Home",
      path: "/",
    },
    {
      icon: isActive("/Content") ? (
        <BiSolidVideos className="size-5" />
      ) : (
        <MdOutlineVideoLibrary className="size-5" />
      ),
      name: "Content",
      path: "Content",
    },
  ];

  const itemsList2 = [
    {
      icon: <FaGithub className="size-5" />,
      name: "GitHub",
      path: "https://github.com/SugamChaudharry",
      external: true
    },
    {
      icon: isActive("/Setting") ? (
        <IoSettings className="size-5" />
      ) : (
        <IoSettingsOutline className="size-5" />
      ),
      name: "Settings",
      path: "/Setting",
    },
  ];

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-zinc-900 border-r border-zinc-800 
                  transition-all duration-300 z-40 
                  ${collapsed ? "w-16" : "w-60"} 
                  hidden sm:block`}
    >
      <div className="h-full flex flex-col justify-between py-4">
        {/* Collapse button */}
        <button
          onClick={handleCollapse}
          className="absolute -right-3 top-4 bg-zinc-800 rounded-full p-1 border border-zinc-700 text-white"
        >
          {collapsed ? (
            <IoChevronForwardOutline className="size-4" />
          ) : (
            <IoChevronBackOutline className="size-4" />
          )}
        </button>

        {/* User profile if logged in */}
        {user && (
          <div
            className={`px-3 mb-6 ${collapsed ? "flex justify-center" : ""}`}
          >
            <Link
              to={`/Channel/${user.userName}`}
              className="flex items-center space-x-3"
            >
              <img
                src={user.avatar}
                alt={user.fullName || user.userName}
                className={`rounded-full object-cover border-2 border-purple-500 
                            ${collapsed ? "size-10" : "size-8"}`}
              />
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-40">
                    {user.fullName || user.userName}
                  </span>
                  <span className="text-xs text-zinc-400">
                    @{user.userName}
                  </span>
                </div>
              )}
            </Link>
          </div>
        )}

        {/* Main navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-1 px-2">
            {itemsList1.map((item, i) => (
              <Link
                to={item.path}
                key={i}
                className={`flex items-center rounded-lg px-3 py-2 transition-colors
                          ${isActive(item.path)
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                  }`}
              >
                <div className={`${collapsed ? "mx-auto" : "mr-3"}`}>
                  {item.icon}
                </div>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer navigation */}
        <div className="space-y-1 px-2 pt-4 border-t border-zinc-800">
          {itemsList2.map((item, i) => (
            item.external ? (
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                className="flex items-center rounded-lg px-3 py-2 transition-colors text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
              >
                <div className={`${collapsed ? "mx-auto" : "mr-3"}`}>
                  {item.icon}
                </div>
                {!collapsed && <span>{item.name}</span>}
              </a>
            ) : (
              <Link
                to={item.path}
                key={i}
                className={`flex items-center rounded-lg px-3 py-2 transition-colors
                          ${isActive(item.path)
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                  }`}
              >
                <div className={`${collapsed ? "mx-auto" : "mr-3"}`}>
                  {item.icon}
                </div>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          ))}
        </div>

        {/* App version or copyright */}
        {!collapsed && (
          <div className="px-3 pt-4 pb-2 text-xs text-zinc-500">
            Vidly Dashboard v1.0.0
          </div>
        )}
      </div>
    </aside>
  );
}

export default DashBoardSideBar;
