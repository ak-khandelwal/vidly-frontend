import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../../app/slices/authSlice";
import AuthLayout from "../auth/AuthLayout";
import NavBar from "../NavBar"
import SideBar from "../SideBar"
import VideoDetail from '../../pages/videos/VideoDetail'
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
          <div className="relative h-full w-[5%] z-20">
            <SideBar collapse={true} />
          </div>
          <div className="h-full w-[95%]">
            <VideoDetail />
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}

export default VideoDetailLayout;
