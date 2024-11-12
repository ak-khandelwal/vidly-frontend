import { Link } from "react-router-dom"

function SideBar() {
  const itemsList1 = [
    {
      iconUrl:"src/assets/sidebar/home.svg",
      name: "Home",
    },
    {
      iconUrl:"src/assets/sidebar/like.svg",
      name: "Liked Videos",
    },
    {
      iconUrl:"src/assets/sidebar/history.svg",
      name: "History",
    },
    {
      iconUrl:"src/assets/sidebar/video.svg",
      name: "My Content",
    },
    {
      iconUrl:"src/assets/sidebar/collections.svg",
      name: "Collections",
    },
    {
      iconUrl:"src/assets/sidebar/subscribers.svg",
      name: "Subscribers",
    },
  ]
  const itemsList2 = [
    {
      iconUrl:"src/assets/sidebar/support.svg",
      name: "Support",
      path: "/TermsAndConditions"
    },
    {
      iconUrl:"src/assets/sidebar/setting.svg",
      name: "Setting",
      path: "/Setting"
    },
  ]
  return (
    <div className="fixed w-[20%] h-[90%] mt-[80px] border-r border-white flex flex-col justify-between">
      <div className=" px-2 flex flex-col gap-2">
        {itemsList1.map((e,i) => (
          <div key={i} className="border text-white flex gap-2 p-2">
            <img src={e.iconUrl} className="size-5" />
            <span>{e.name}</span>
          </div>
        ))}
      </div>
      <div className="p-2 flex flex-col gap-2">
        {itemsList2.map((e,i) => (
          <Link key={i} to={e.path}>
          <div  className="border text-white flex gap-2 p-2">
            <img src={e.iconUrl} className="size-5" />
            <span>{e.name}</span>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideBar