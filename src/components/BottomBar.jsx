import { Link } from "react-router-dom";
import {
  IoFolderOpenOutline,
  IoHomeOutline,
  IoSettingsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RiUserHeartLine } from "react-icons/ri";
import { GiKiwiBird } from "react-icons/gi";

const BottomBar = () => {
  const itemsList1 = [
    {
      iconComponent: <IoHomeOutline className="size-5"/>,
      path: "/",
    },
    {
      iconComponent: <GiKiwiBird className="size-5"/>,
      path: "/",
    },
    {
      iconComponent: <IoVideocamOutline className="size-5"/>,
      path: "/Dashboard",
    },
    {
      iconComponent: <IoFolderOpenOutline className="size-5"/>,
      path: "/",
    },
    {
      iconComponent: <RiUserHeartLine className="size-5"/>,
      path: "/Subscriptions",
    },
    {
      iconComponent: <IoSettingsOutline className="size-5" />,
      path: "/Setting",
    },
  ];

  return (
    <div className="sm:hidden fixed w-full bg-black lg:h-[10%] border-y-2  px-2 bottom-0 flex justify-between">
      {itemsList1.map((item, index) => (
        <Link key={index} to={item.path}>
        <div className="p-2 text-white">
          {item.iconComponent}
        </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomBar;
