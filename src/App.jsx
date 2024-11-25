import {Outlet} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/slice/authSlice";
import NavBar from "./features/common/components/NavBar";
import SideBar from "./features/common/components/SideBar";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="w-screen h-screen">
    <NavBar />
    <div className="h-[100%] flex ">
      <div className="relative w-[20%]">
        <SideBar />
      </div>
      <div className="w-[80%] h-[90%] ">
        <Outlet />
      </div>
    </div>
  </div>
  );
}

export default App;
