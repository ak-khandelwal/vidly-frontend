import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { avatarUpdate, coverImageUpdate, selectCurrentUser } from "../auth/slice/authSlice";
import FileUploadPopUp from "./components/FileUploadPopUp";
import { RiImageAddFill } from "react-icons/ri";

function SettingLayout() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeClass =
    "bg-white h-[60%] text-purple-600 border-b-2 border-purple-500";
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState([1, 0]);
  const [showPopUp, setShowPopUp] = useState([0, 0]); // [coverImage, avatarImage]

  const handleAvatarUpload = async() => {
    if (avatar) {
      setLoading(true);
      const res = await dispatch(avatarUpdate({avatar}));
      if(res.type === "avatarUpdate/fulfilled"){
        setLoading(false);
        setImage(null)
        cancelPopUp();
      }else{
        setLoading(false);
      }
    }
  };
  const handleCoverUpload = async() => {
    if (cover) {
      setLoading(true);
      const res = await dispatch(coverImageUpdate({coverImage:cover}));
      if(res.type === "CoverImageUpdate/fulfilled"){
        cancelPopUp();
        setImage(null);
      }else{
        setLoading(false);
      }
    }
  };
  const handleActive = (index) => {
    const newActive = [0, 0];
    newActive[index] = 1;
    setActive(newActive);
    if (newActive[1] == 1) navigate("ChangePassword");
    if (newActive[0] == 1) navigate("ChangeInfo");
  };

  const handlePopUp = (index) => {
    const newPopUp = [0, 0];
    newPopUp[index] = 1;
    setShowPopUp(newPopUp);
  };
  const cancelPopUp = () => {
    setCover(() => null);
    setAvatar(null);
    setLoading(false)
    setShowPopUp([0, 0]);
  };

  return (
    <div className="h-full overflow-y-scroll no-scrollbar">
      <div className="h-[45%]">
        <CoverImage user={user} handlePopUp={handlePopUp} />
        <div className="h-[25%] flex justify-between items-center">
          <div className="h-full flex gap-16 items-center ">
            <AvatarImage user={user} handlePopUp={handlePopUp} />
            <div>
              <h2 className="font-semibold text-white text-xl">
                {user?.fullName}
              </h2>
              <h2 className=" text-white text-lg">@{user?.userName}</h2>
            </div>
          </div>
          <Link
            to={`/Channel/${user?.userName}`}
            className="h-full flex justify-between items-center"
          >
            <div className="w-32 h-[40%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center mr-9 select-none">
              View Channel
            </div>
          </Link>
        </div>
        <div className="h-[20%] border-b-2 flex px-10 text-white items-center justify-around">
          <div
            className={`px-32 flex text-center items-center cursor-pointer ${
              active[0] === 1 ? activeClass : ""
            }`}
            onClick={() => handleActive(0)}
          >
            Personal information
          </div>
          <div
            className={`px-32 flex text-center items-center cursor-pointer ${
              active[1] === 1 ? activeClass : ""
            }`}
            onClick={() => handleActive(1)}
          >
            Change password
          </div>
        </div>
      </div>
      <div className="h-[55%] text-white relative">
        {showPopUp[0] === 1 && (
          <FileUploadPopUp
            cancelPopUp={cancelPopUp}
            setBulb={setCover}
            setImage={setImage}
            image={image}
            handleSubmit={handleCoverUpload}
            loading={loading}
            >
            <span>Upload new cover image</span>
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
            <span>Upload new avatar</span>
          </FileUploadPopUp>
        )}
        <Outlet />
      </div>
    </div>
  );
}
function CoverImage({ user, handlePopUp }) {
  return (
    <div className="h-[55%] relative" onClick={() => handlePopUp(0)}>
      <img
        src={user?.coverImage}
        className="h-full bg-cover object-cover w-full"
      />
      <RiImageAddFill
        src="src/assets/auth/upload.svg"
        className="absolute inset-0 m-auto h-10 w-10 cursor-pointer text-yellow-300"
        alt="edit"
      />
    </div>
  );
}

function AvatarImage({ user, handlePopUp }) {
  return (
    <div
      className="h-full relative flex justify-center items-center "
      onClick={() => handlePopUp(1)}
    >
      <img
        src={user?.avatar}
        className=" bg-cover object-cover size-28 rounded-full -translate-y-8 translate-x-10 "
      />
      <RiImageAddFill
        src="src/assets/auth/upload.svg"
        className="absolute inset-0 m-auto h-6 w-6 cursor-pointer -translate-y-8 translate-x-10  text-yellow-300"
        alt="edit"
      />
    </div>
  );
}
export default SettingLayout;
