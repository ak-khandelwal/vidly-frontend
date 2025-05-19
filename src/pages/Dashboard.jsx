import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import DashBoardSideBar from "../components/dashboard/DashBoardSideBar";
import DashBoardBottomBar from "../components/dashboard/DashBoardBottomBar";
import { AuthLayout } from "../components/auth";
import { getCurrentUser } from "../app/slices/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default to collapsed

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Function to toggle sidebar state that will be passed to the DashBoardSideBar
  const toggleSidebar = (state) => {
    setSidebarCollapsed(state);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden text-white bg-[#121212]">
      <AuthLayout>
        <div className="relative w-full h-[7%] sm:h-[10%] z-40">
          <NavBar />
        </div>
        <div className="flex w-full ">
          <DashBoardSideBar defaultCollapsed={true} onToggle={toggleSidebar} />
          <div
            className={`transition-all duration-300 ${sidebarCollapsed
              ? "w-full sm:w-[calc(100%-4rem)] sm:ml-16"
              : "w-full sm:w-[calc(100%-15rem)] sm:ml-60"
              }`}
          >
            <Outlet />
          </div>
        </div>
        <div className="h-[10%] sm:h-0 sm:hidden">
          <DashBoardBottomBar />
        </div>
      </AuthLayout>
    </div>
  );
}

export default Dashboard;
