import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function BaseLayout() {
  return (
    <>
      <NavBar />
      <div className="h-[90%] flex ">
        <div className="relative w-[20%]">
          <SideBar />
        </div>
        <div className="w-[80%] ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
