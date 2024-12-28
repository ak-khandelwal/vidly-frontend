import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  logoutUser,
  selectCurrentStatus,
  selectCurrentUser,
} from "../app/slices/authSlice";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const authStatus = useSelector(selectCurrentStatus);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      dispatch(logoutUser()).unwrap(); // Unwrap the result to handle success or errors.
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    if (searchQuery.length !== 0) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  return (
    <div className="fixed w-full bg-black h-[7%] lg:h-[10%] border-b border-white flex justify-between items-center px-2">
      <Link to={"/"}>
        <img src="/play.jpeg" className="size-10 lg:size-14" />
      </Link>
      <form
        onSubmit={(e) => handleSumbit(e)}
        className="border border-white h-[50] lg:h-[60%] w-2/5 lg:w-2/6  flex"
      >
        <div className="p-2 transform-none lg:flex flex-col items-center justify-center">
          <IoSearch className=" text-white size-5" />
        </div>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          value={searchQuery}
          placeholder="Search"
          className="text-white bg-transparent outline-none w-full"
        />
      </form>
      {authStatus === false ? (
        <div className="h-[60%] flex select-none gap-1">
          <Link to={"/login"}>
            <div className=" bg-gray-400 text-black sm:text-white sm:bg-transparent w-20 h-[90%] hover:bg-[#3432326b] flex flex-col text-center justify-center shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 sm:shadow-none">
              Log in
            </div>
          </Link>
          <Link to={"/signup"}>
            <div className="hidden sm:flex sm:flex-col sm:text-center sm:justify-center w-20 h-[90%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1  ">
              Sign up
            </div>
          </Link>
        </div>
      ) : (
        <div className="h-[60%] flex select-none items-center gap-4">
          {/* for small device */}
          <div className="sm:hidden">
            <Dropdown handleLogout={handleLogout} userName={user?.userName}/>
          </div>
          {/* for larger device */}
          <Link to={`/Channel/${user?.userName}`}>
            <img
              src={user?.avatar}
              className="rounded-full hidden sm:block size-12"
            ></img>
          </Link>
          <div
            onClick={handleLogout}
            className="w-20 h-[90%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 hidden sm:flex flex-col text-center justify-center"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

const Dropdown = ({ handleLogout, userName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="w-full h-full relative">
      <BsThreeDotsVertical className="text-white text-2xl" onClick={() => toggleDropdown()} />
      {isOpen && (
        <div className="absolute z-10 -left-32 top-14  bg-black border-2 border-pink-500 p-2 w-40">
           <button className="p-2 text-white  border-y w-full" onClick={() => handleLogout()} >
              Logout
           </button> 
          <Link to={`/Channel/${userName}`}>
           <button className="p-2 text-white  border-y w-full" >
              View Channel
           </button> 
        </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
