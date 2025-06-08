import { Link, useLocation } from "react-router-dom";
import {
  IoFolderOpenOutline,
  IoFolderOpen,
  IoHomeOutline,
  IoHome,
  IoVideocamOutline,
  IoVideocam,
  IoTime,
  IoTimeOutline,
} from "react-icons/io5";
import { RiUserHeartLine, RiUserHeartFill } from "react-icons/ri";
import { AiOutlineHistory } from "react-icons/ai";
const BottomBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
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
      icon: isActive("/History") ? (
        <IoTime className="size-6" />
      ) : (
        <IoTimeOutline className="size-6" />
      ),
      name: "History",
      path: "/History",
    },
    {
      icon: isActive("/Dashboard") ? (
        <IoVideocam className="size-6" />
      ) : (
        <IoVideocamOutline className="size-6" />
      ),
      name: "Content",
      path: "/Dashboard",
    },
    {
      icon: isActive("/Subscriptions") ? (
        <RiUserHeartFill className="size-6" />
      ) : (
        <RiUserHeartLine className="size-6" />
      ),
      name: "Subs",
      path: "/Subscriptions",
    },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
      <div className="flex justify-between items-center px-2">
        {itemsList.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
