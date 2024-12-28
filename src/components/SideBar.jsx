import { Link } from "react-router-dom";
import { TbBaselineDensityMedium } from "react-icons/tb";
import {
  IoFolderOpenOutline,
  IoHomeOutline,
  IoSettingsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
import { RiUserHeartLine } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";
import { GiKiwiBird } from "react-icons/gi";

function SideBar({ collapse = false }) {
  const itemsList1 = [
    {
      iconComponent: <IoHomeOutline className="w-full h-full" />,
      name: "Home",
      path: "/",
    },
    {
      iconComponent: <GiKiwiBird className="w-full h-full" />,
      name: "Tweets",
      path: "/",
    },
    {
      iconComponent: <AiOutlineHistory className="w-full h-full" />,
      name: "History",
      path: "/History",
    },
    {
      iconComponent: <IoVideocamOutline className="w-full h-full" />,
      name: "Your Content",
      path: "/Dashboard",
    },
    {
      iconComponent: <IoFolderOpenOutline className="w-full h-full" />,
      name: "Collections",
      path: "/",
    },
    {
      iconComponent: <RiUserHeartLine className="w-full h-full" />,
      name: "Subscriptions",
      path: "/Subscriptions",
    },
  ];
  const itemsList2 = [
    {
      iconComponent: <MdOutlineContactSupport className="w-full h-full" />,
      name: "Support",
      path: "/PrivacyPolicy",
    },
    {
      iconComponent: <IoSettingsOutline className="w-full h-full" />,
      name: "Setting",
      path: "/Setting",
    },
  ];
  return (
    <aside>
      <TbBaselineDensityMedium className="text-white sm:hidden" />
      <div
        className={`fixed h-[90%] bg-black border-r border-white flex flex-col justify-between ${collapse ? "group hover:w-[20%]" : "w-[20%]"} `}
      >
        <div className="px-2 flex  flex-col gap-2 mt-2">
          {itemsList1.map((e, i) => (
            <Link
              to={e.path}
              key={i}
              className="border text-white flex gap-2 p-2 group-hover:w-full"
            >
              <div className="size-5">{e.iconComponent}</div>
              <div
                className={collapse ? "group-hover:inline-block hidden" : ""}
              >
                {e.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="p-2 flex flex-col gap-2">
          {itemsList2.map((e, i) => (
            <Link key={i} to={e.path}>
              <div className="border text-white flex gap-2 p-2">
                <div className="size-5">{e.iconComponent}</div>
                <div
                  className={collapse ? "group-hover:inline-block hidden" : ""}
                >
                  {e.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
