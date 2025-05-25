import { Link, useLocation } from "react-router-dom";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

const DashBoardBottomBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.endsWith(path);
  };

  const itemsList = [
    {
      icon: isActive("/") ? (
        <IoHome className="size-6" />
      ) : (
        <IoHomeOutline className="size-6" />
      ),
      name: "Home",
      path: "/",
    },
    {
      icon: isActive("/Content") ? (
        <BiSolidVideos className="size-6" />
      ) : (
        <MdOutlineVideoLibrary className="size-6" />
      ),
      name: "Content",
      path: "Content",
    },
    {
      icon: <FaGithub className="size-6" />,
      name: "GitHub",
      path: "https://github.com/SugamChaudharry",
      external: true
    },
    {
      icon: isActive("/Setting") ? (
        <IoSettings className="size-6" />
      ) : (
        <IoSettingsOutline className="size-6" />
      ),
      name: "Settings",
      path: "/Setting",
    },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
      <div className="flex justify-between items-center px-2">
        {itemsList.map((item, index) => (
          item.external ? (
            <a
              key={index}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center py-2 px-3 text-zinc-400 hover:text-white"
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs">{item.name}</span>
            </a>
          ) : (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive(item.path) ? "text-white" : "text-zinc-400"
              }`}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs">{item.name}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default DashBoardBottomBar;
