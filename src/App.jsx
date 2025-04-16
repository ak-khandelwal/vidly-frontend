import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./app/slices/authSlice";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import BottomBar from "./components/BottomBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      <NavBar />

      <div className="flex pt-16">
        {" "}
        {/* Add padding-top to account for fixed navbar */}
        <SideBar hidden={true} />
        <main className="w-full sm:ml-[240px] px-4 py-6">
          <Outlet />
        </main>
        <BottomBar />
      </div>
    </div>
  );
}

export default App;
