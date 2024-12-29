import { useState } from "react";
import { BiSolidVideos } from "react-icons/bi";
import { RiFeedbackLine } from "react-icons/ri";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { TbBaselineDensityMedium } from "react-icons/tb";
import { Link } from "react-router-dom";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
function DashBoardSideBar() {
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
  ];
  const itemsList2 = [
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

  const [collapse, setCollapse] = useState(false);
  const handalCollapse = () => setCollapse((i) => !i);

  return (
    <aside className={`${collapse ? "w-[5%]" : "w-[25%]"} relative hidden sm:block`}>
      <div
        className={`fixed h-[90%] bg-black border-r border-white flex flex-col justify-between ${collapse ? "w-fit" : "w-[20%]"} `}
      >
        <div className="px-2 flex text-start flex-col gap-2 mt-2">
          <div className="border-b-2 py-2">
            <TbBaselineDensityMedium
              className="size-6 "
              onClick={() => handalCollapse()}
            />
          </div>
          {itemsList1.map((e, i) => (
            <Link to={e.path} key={i} className={`border flex gap-2 p-2 `}>
              <div className="size-5">{e.iconComponent}</div>
              <div className={`${collapse ? "hidden" : "block"}`}>{e.name}</div>
            </Link>
          ))}
        </div>
        <div className="p-2 flex flex-col gap-2">
          {itemsList2.map((e, i) => (
            <Link key={i} to={e.path}>
              <div className="border flex gap-2 p-2">
                <div className="size-5">{e.iconComponent}</div>
                <div className={`${collapse ? "hidden" : "block"}`}>
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

export default DashBoardSideBar;
