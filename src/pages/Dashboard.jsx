import BottomBar from "../components/BottomBar";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { AuthLayout } from "../components/auth";

function Dashboard() {
  return (
    <div className="w-screen h-screen overflow-x-hidden text-white">
      <AuthLayout>
        <div className="relative w-full h-[7%] sm:h-[10%]">
          <NavBar />
        </div>
        <div className="flex w-full">
          <div className="hidden sm:block relative h-full w-[5%] z-20">
            <SideBar collapse={true} />
          </div>
          <div className="h-full p-4 w-[95%]">
            <div className="">
              <div>
                <h1 className="font-bold text-xl">
                  Welcome Back, React Patterns
                </h1>
                <p className="text-gray-200">
                  Seamless Video Management, Elevated Results.
                </p>
              </div>
              <div className="">+ Upload video</div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
        <BottomBar />
      </AuthLayout>
    </div>
  );
}

export default Dashboard;
