import { Link } from "react-router-dom"
import { IoFolderOpenOutline, IoHomeOutline, IoSettingsOutline, IoVideocamOutline } from "react-icons/io5";
import { AiOutlineHistory, AiOutlineLike } from "react-icons/ai";
import { RiUserHeartLine } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";

function SideBar() {
  const itemsList1 = [
    {
      iconComponent: <IoHomeOutline className="w-full h-full" />,
      name: "Home",
    },
    {
      iconComponent: <AiOutlineLike className="w-full h-full" />,
      name: "Liked Videos",
    },
    {
      iconComponent: <AiOutlineHistory className="w-full h-full"/>,
      name: "History",
    },
    {
      iconComponent: <IoVideocamOutline className="w-full h-full" />,
      name: "My Content",
    },
    {
      iconComponent: <IoFolderOpenOutline className="w-full h-full" />,
      name: "Collections",
    },
    {
      iconComponent: <RiUserHeartLine className="w-full h-full" />,
      name: "Subscribers",
    },
  ]
  const itemsList2 = [
    {
      iconComponent: <MdOutlineContactSupport className="w-full h-full" />,
      name: "Support",
      path: "/TermsAndConditions"
    },
    {
      iconComponent: <IoSettingsOutline className="w-full h-full" />,
      name: "Setting",
      path: "/Setting"
    },
  ]
  return (
    <div className="fixed w-[20%] h-[90%] mt-[80px] border-r border-white flex flex-col justify-between">
      <div className=" px-2 flex flex-col gap-2 mt-2">
        {itemsList1.map((e,i) => (
          <div key={i} className="border text-white flex gap-2 p-2">
            <span className="size-5">{e.iconComponent}</span>
            <span>{e.name}</span>
          </div>
        ))}
      </div>
      <div className="p-2 flex flex-col gap-2">
        {itemsList2.map((e,i) => (
          <Link key={i} to={e.path}>
          <div  className="border text-white flex gap-2 p-2">
          <span className="size-5">{e.iconComponent}</span>
            <span>{e.name}</span>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideBar