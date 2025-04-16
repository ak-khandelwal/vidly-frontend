import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  avatarUpdate,
  coverImageUpdate,
  selectCurrentUser,
} from "../../app/slices/authSlice";
import FileUploadPopUp from "./FileUploadPopUp";
import {
  RiImageAddFill,
  RiUser3Line,
  RiLockLine,
  RiArrowRightLine,
} from "react-icons/ri";

function SettingLayout() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState([1, 0]);
  const [showPopUp, setShowPopUp] = useState([0, 0]); // [coverImage, avatarImage]

  const handleAvatarUpload = async () => {
    if (avatar) {
      setLoading(true);
      const res = await dispatch(avatarUpdate({ avatar }));
      if (res.type === "avatarUpdate/fulfilled") {
        setLoading(false);
        setImage(null);
        cancelPopUp();
      } else {
        setLoading(false);
      }
    }
  };

  const handleCoverUpload = async () => {
    if (cover) {
      setLoading(true);
      const res = await dispatch(coverImageUpdate({ coverImage: cover }));
      if (res.type === "CoverImageUpdate/fulfilled") {
        cancelPopUp();
        setImage(null);
      } else {
        setLoading(false);
      }
    }
  };

  const handleActive = (index) => {
    const newActive = [0, 0];
    newActive[index] = 1;
    setActive(newActive);
    if (newActive[1] === 1) navigate("ChangePassword");
    if (newActive[0] === 1) navigate("ChangeInfo");
  };

  const handlePopUp = (index) => {
    const newPopUp = [0, 0];
    newPopUp[index] = 1;
    setShowPopUp(newPopUp);
  };

  const cancelPopUp = () => {
    setCover(null);
    setAvatar(null);
    setLoading(false);
    setShowPopUp([0, 0]);
  };

  return (
    <div className="h-full overflow-y-auto bg-zinc-900 rounded-lg shadow-xl">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div
          className="h-48 sm:h-64 w-full relative overflow-hidden rounded-t-lg group"
          onClick={() => handlePopUp(0)}
        >
          <img
            src={user?.coverImage}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <RiImageAddFill className="text-white text-3xl" />
          </div>
        </div>

        {/* Avatar */}
        <div
          className="absolute left-8 -bottom-16 group cursor-pointer"
          onClick={() => handlePopUp(1)}
        >
          <div className="relative">
            <img
              src={user?.avatar}
              className="w-32 h-32 rounded-full border-4 border-zinc-900 object-cover"
              alt="Avatar"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <RiImageAddFill className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* User Info & Channel Button - Improved Layout */}
      <div className="pt-20 px-8 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-white transition-colors hover:text-purple-400">
            {user?.fullName}
          </h2>
          <h3 className="text-lg text-gray-400 flex items-center gap-1">
            <span className="text-sm text-gray-500">@</span>
            {user?.userName}
          </h3>
        </div>

        <Link
          to={`/Channel/${user?.userName}`}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-5 py-2.5 rounded-md transition-all duration-300 shadow-lg hover:shadow-purple-900/30 w-full sm:w-auto"
        >
          <span className="font-medium">View Channel</span>
          <RiArrowRightLine className="text-lg" />
        </Link>
      </div>

      {/* Navigation Tabs - Improved Design */}
      <div className="px-8">
        <div className="flex border-b border-zinc-700">
          <button
            className={`px-6 py-4 flex items-center gap-2 transition-all duration-300 relative ${
              active[0] === 1
                ? "text-purple-400 font-medium"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => handleActive(0)}
          >
            <RiUser3Line
              className={`text-lg ${active[0] === 1 ? "text-purple-500" : ""}`}
            />
            <span>Personal Information</span>
            {active[0] === 1 && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-purple-400"></span>
            )}
          </button>
          <button
            className={`px-6 py-4 flex items-center gap-2 transition-all duration-300 relative ${
              active[1] === 1
                ? "text-purple-400 font-medium"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => handleActive(1)}
          >
            <RiLockLine
              className={`text-lg ${active[1] === 1 ? "text-purple-500" : ""}`}
            />
            <span>Change Password</span>
            {active[1] === 1 && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-purple-400"></span>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {/* Upload Popups */}
        {showPopUp[0] === 1 && (
          <FileUploadPopUp
            cancelPopUp={cancelPopUp}
            setBulb={setCover}
            setImage={setImage}
            image={image}
            handleSubmit={handleCoverUpload}
            loading={loading}
          >
            <span className="text-lg font-medium">Upload new cover image</span>
          </FileUploadPopUp>
        )}
        {showPopUp[1] === 1 && (
          <FileUploadPopUp
            cancelPopUp={cancelPopUp}
            setBulb={setAvatar}
            setImage={setImage}
            image={image}
            handleSubmit={handleAvatarUpload}
            loading={loading}
          >
            <span className="text-lg font-medium">Upload new avatar</span>
          </FileUploadPopUp>
        )}

        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default SettingLayout;
