import NavBar from "../../common/components/NavBar"
import SideBar from "../../common/components/SideBar"
import VideoDetail from "../pages/VideoDetail"
import AuthLayout from "../../auth/components/AuthLayout"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getCurrentUser } from "../../auth/slice/authSlice"

function VideoDetailLayout() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch])

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
            <div className="h-full">
          <VideoDetail />
            </div>
          </div>
        </AuthLayout>
      </div>
  )
}

export default VideoDetailLayout