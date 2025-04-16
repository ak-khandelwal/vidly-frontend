import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch, IoClose, IoNotificationsOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  logoutUser,
  selectCurrentStatus,
  selectCurrentUser,
} from "../app/slices/authSlice";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(selectCurrentStatus);
  const user = useSelector(selectCurrentUser);
  const searchInputRef = useRef(null);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <nav className="fixed top-0 w-full bg-zinc-900 h-16 border-b border-zinc-800 z-50 px-4">
      <div className="h-full max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - hidden when search is open on mobile */}
        <Link
          to="/"
          className={`flex items-center space-x-2 ${isSearchOpen ? "hidden md:flex" : "flex"}`}
        >
          <img src="/play.jpeg" className="h-8 w-8" alt="Logo" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Vidly
          </span>
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center flex-1 max-w-xl mx-8"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full py-2 pl-4 pr-10 bg-zinc-800 border border-zinc-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <IoSearch className="text-zinc-400 hover:text-white size-5" />
            </button>
          </div>
        </form>

        {/* Mobile Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className={`md:hidden text-white ${isSearchOpen ? "hidden" : "block"}`}
        >
          <IoSearch className="size-6" />
        </button>

        {/* Mobile Search Bar - Full Width */}
        {isSearchOpen && (
          <form
            onSubmit={handleSubmit}
            className="md:hidden absolute inset-x-0 top-0 h-16 bg-zinc-900 flex items-center px-4 border-b border-zinc-800"
          >
            <div className="flex items-center w-full">
              <IoSearch className="text-zinc-400 size-5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="text-white bg-transparent outline-none w-full px-2"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-white"
              >
                <IoClose className="size-6" />
              </button>
            </div>
          </form>
        )}

        {/* Auth Buttons */}
        <div
          className={`flex items-center space-x-4 ${isSearchOpen ? "hidden md:flex" : "flex"}`}
        >
          {!authStatus ? (
            <>
              <Link to="/login">
                <button className="px-4 py-1.5 text-white bg-transparent border border-zinc-600 rounded-full hover:bg-zinc-800 transition-all">
                  Log in
                </button>
              </Link>
              <Link to="/signup" className="hidden sm:block">
                <button className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:opacity-90 transition-all">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-white hidden sm:block">
                <IoNotificationsOutline className="size-6" />
              </button>

              {/* Mobile Dropdown */}
              <div className="sm:hidden">
                <CustomDropdown
                  handleLogout={handleLogout}
                  userName={user?.userName}
                />
              </div>

              {/* Desktop User Info */}
              <div className="hidden sm:flex items-center space-x-3">
                <Link to={`/Channel/${user?.userName}`}>
                  <img
                    src={user?.avatar}
                    alt={user?.fullName || user?.userName}
                    className="rounded-full size-8 object-cover border-2 border-purple-500"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const CustomDropdown = ({ handleLogout, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-1 rounded-full hover:bg-zinc-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BsThreeDotsVertical className="text-white text-xl" />
      </button>

      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg overflow-hidden w-48">
          <Link to={`/Channel/${userName}`}>
            <button className="w-full px-4 py-2 text-white text-left hover:bg-zinc-700 transition-all">
              View Channel
            </button>
          </Link>
          <Link to="/Dashboard">
            <button className="w-full px-4 py-2 text-white text-left hover:bg-zinc-700 transition-all">
              Dashboard
            </button>
          </Link>
          <Link to="/Setting">
            <button className="w-full px-4 py-2 text-white text-left hover:bg-zinc-700 transition-all">
              Settings
            </button>
          </Link>
          <hr className="border-zinc-700" />
          <button
            className="w-full px-4 py-2 text-red-400 text-left hover:bg-zinc-700 transition-all"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
