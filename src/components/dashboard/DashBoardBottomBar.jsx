import { Link, useLocation } from "react-router-dom";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { RiFeedbackLine, RiFeedbackFill } from "react-icons/ri";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";

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
      icon: isActive("/Analytics") ? (
        <FaChartBar className="size-6" />
      ) : (
        <TbBrandGoogleAnalytics className="size-6" />
      ),
      name: "Analytics",
      path: "Analytics",
    },
    {
      icon: isActive("/SendFeedback") ? (
        <RiFeedbackFill className="size-6" />
      ) : (
        <RiFeedbackLine className="size-6" />
      ),
      name: "Feedback",
      path: "/SendFeedback",
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

export default DashBoardBottomBar;
