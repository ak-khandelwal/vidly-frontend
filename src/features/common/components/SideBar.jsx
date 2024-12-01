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
      path: "/"
    },
    {
      iconComponent: <AiOutlineLike className="w-full h-full" />,
      name: "Liked Videos",
      path: "/"
    },
    {
      iconComponent: <AiOutlineHistory className="w-full h-full"/>,
      name: "History",
      path: "/"
    },
    {
      iconComponent: <IoVideocamOutline className="w-full h-full" />,
      name: "My Content",
      path: "/"
    },
    {
      iconComponent: <IoFolderOpenOutline className="w-full h-full" />,
      name: "Collections",
      path: "/"
    },
    {
      iconComponent: <RiUserHeartLine className="w-full h-full" />,
      name: "Subscribers",
      path: "/"
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
    <div className="fixed w-[20%] h-[90%] border-r border-white flex flex-col justify-between">
      <div className=" px-2 flex flex-col gap-2 mt-2">
        {itemsList1.map((e,i) => (
          <Link to={e.path} key={i} className="border text-white flex gap-2 p-2">
            <span className="size-5">{e.iconComponent}</span>
            <span>{e.name}</span>
          </Link>
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