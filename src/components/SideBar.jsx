import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
  IoVideocamOutline,
  IoVideocam,
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "react-icons/io5";
import { AiOutlineHistory, AiFillGithub } from "react-icons/ai";
import {
  RiUserHeartLine,
  RiUserHeartFill,
  RiChatHistoryFill,
} from "react-icons/ri";
import { MdOutlineContactSupport, MdContactSupport } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../app/slices/authSlice";

function SideBar({ collapse = false, hidden = false }) {
  const [collapsed, setCollapsed] = useState(collapse);
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  const isActive = (path) => {
    return location.pathname === path;
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
      icon: isActive("/History") ? (
        <RiChatHistoryFill className="size-5" />
      ) : (
        <AiOutlineHistory className="size-5" />
      ),
      name: "History",
      path: "/History",
    },
    {
      icon: isActive("/Dashboard") ? (
        <IoVideocam className="size-5" />
      ) : (
        <IoVideocamOutline className="size-5" />
      ),
      name: "Your Content",
      path: "/Dashboard",
    },
    {
      icon: isActive("/Subscriptions") ? (
        <RiUserHeartFill className="size-5" />
      ) : (
        <RiUserHeartLine className="size-5" />
      ),
      name: "Subscriptions",
      path: "/Subscriptions",
    },
  ];

  const itemsList2 = [
    {
      icon: <AiFillGithub className="size-5" />,
      name: "Github",
      path: "https://github.com/SugamChaudharry/Vidly",
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

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-zinc-900 border-r border-zinc-800 
                      transition-all duration-300 z-40 
                      ${collapsed ? "w-16" : "w-60"} 
                      hidden sm:block`}
    >
      <div className="h-full flex flex-col justify-between py-4">
        {/* Collapse button */}
        {!hidden && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-4 bg-zinc-800 rounded-full p-1 border border-zinc-700 text-white"
          >
            {collapsed ? (
              <IoChevronForwardOutline className="size-4" />
            ) : (
              <IoChevronBackOutline className="size-4" />
            )}
          </button>
        )}
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
                          ${
                            isActive(item.path)
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
            <Link
              to={item.path}
              key={i}
              className={`flex items-center rounded-lg px-3 py-2 transition-colors
                        ${
                          isActive(item.path)
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

        {/* App version or copyright */}
        {!collapsed && (
          <div className="px-3 pt-4 pb-2 text-xs text-zinc-500">
            Vidly v1.0.0
          </div>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
