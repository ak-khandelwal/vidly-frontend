import { Link } from "react-router-dom";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BiSolidVideos } from "react-icons/bi";
import { RiFeedbackLine } from "react-icons/ri";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
const DashBoardBottomBar = () => {
  const itemsList1 = [
    {
      iconComponent: <IoHomeOutline className="w-full h-full" />,
      name: "Home",
      path: "/",
    },
    {
      iconComponent: <BiSolidVideos className="w-full h-full" />,
      name: "Content",
      path: "Content",
    },
    {
      iconComponent: <TbBrandGoogleAnalytics className="w-full h-full" />,
      name: "Analytics",
      path: "Analytics",
    },
    {
      iconComponent: <RiFeedbackLine className="w-full h-full" />,
      name: "Send Feedback",
      path: "/SendFeedback",
    },
    {
      iconComponent: <IoSettingsOutline className="w-full h-full" />,
      name: "Setting",
      path: "/Setting",
    },
  ];

  return (
    <div className="sm:hidden fixed w-full bg-black lg:h-[10%] border-y-2  px-2 bottom-0 flex justify-between">
      {itemsList1.map((item, index) => (
        <Link key={index} to={item.path}>
          <div className="p-2 text-white">{item.iconComponent}</div>
        </Link>
      ))}
    </div>
  );
};

export default DashBoardBottomBar;
