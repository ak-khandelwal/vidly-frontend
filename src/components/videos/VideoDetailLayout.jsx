import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../../app/slices/authSlice";
import AuthLayout from "../auth/AuthLayout";
import NavBar from "../NavBar"
import SideBar from "../SideBar"
import VideoDetail from "../../pages/VideoDetail"
import BottomBar from "../BottomBar";
function VideoDetailLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <AuthLayout>
        <div className="relative w-full h-[10%]">
          <NavBar />
        </div>
        <div className="flex w-full">
          <div className="hidden sm:block relative h-full w-[5%] z-20">
            <SideBar collapse={true} />
          </div>
          <div className="h-full w-[95%]">
            <VideoDetail />
          </div>
        </div>
        <BottomBar />
      </AuthLayout>
    </div>
  );
}

export default VideoDetailLayout;
