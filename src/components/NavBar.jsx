import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch, IoClose } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  logoutUser,
  selectCurrentStatus,
  selectCurrentUser,
} from '../app/slices/authSlice';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(selectCurrentStatus);
  const user = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className='fixed top-0 w-full bg-black h-16 border-b border-white z-50'>
      <div className='h-full flex justify-between items-center px-4'>
        {/* Logo - hidden when search is open on mobile */}
        <Link
          to='/'
          className={`${isSearchOpen ? 'hidden md:block' : 'block'}`}
        >
          <img src='/play.jpeg' className='h-10 w-10' />
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSubmit}
          className='hidden md:flex border border-white h-[60%] w-2/5 lg:w-2/6'
        >
          <div className='p-2 flex items-center justify-center'>
            <IoSearch className='text-white size-5' />
          </div>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search'
            className='text-white bg-transparent outline-none w-full'
          />
        </form>

        {/* Mobile Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className={`md:hidden text-white ${isSearchOpen ? 'hidden' : 'block'}`}
        >
          <IoSearch className='size-6' />
        </button>

        {/* Mobile Search Bar - Full Width */}
        {isSearchOpen && (
          <form
            onSubmit={handleSubmit}
            className='md:hidden absolute inset-x-0 top-0 h-16 bg-black flex items-center px-4 border-b border-white'
          >
            <div className='flex items-center w-full'>
              <IoSearch className='text-white size-5' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search'
                autoFocus
                className='text-white bg-transparent outline-none w-full px-2'
              />
              <button
                type='button'
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className='text-white'
              >
                <IoClose className='size-6' />
              </button>
            </div>
          </form>
        )}

        {/* Auth Buttons */}
        <div
          className={`h-[60%] flex select-none gap-1 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}
        >
          {!authStatus ? (
            <>
              <Link to='/login'>
                <div className='bg-gray-400 text-black sm:text-white sm:bg-transparent w-20 h-[90%] hover:bg-[#3432326b] flex flex-col text-center justify-center shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 sm:shadow-none'>
                  Log in
                </div>
              </Link>
              <Link to='/signup'>
                <div className='hidden sm:flex sm:flex-col sm:text-center sm:justify-center w-20 h-[90%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1'>
                  Sign up
                </div>
              </Link>
            </>
          ) : (
            <div className='h-[60%] flex select-none items-center gap-4'>
              {/* Mobile Dropdown */}
              <div className='sm:hidden'>
                <CustomDropdown
                  handleLogout={handleLogout}
                  userName={user?.userName}
                />
              </div>
              {/* Desktop User Info */}
              <Link to={`/Channel/${user?.userName}`}>
                <img
                  src={user?.avatar}
                  className='rounded-full hidden sm:block size-11 mt-4 object-cover'
                />
              </Link>
              <div
                onClick={handleLogout}
                className='px-4 py-2 mt-3 bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 hidden sm:flex flex-col text-center justify-center'
              >
                Logout
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='w-full h-full relative mt-4' ref={dropdownRef}>
      <BsThreeDotsVertical
        className='text-white text-2xl text-center'
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className='absolute z-10 -left-32 top-14 bg-black border-2 border-pink-500 p-2 w-40'>
          <button
            className='p-2 text-white border-y w-full'
            onClick={() => handleLogout()}
          >
            Logout
          </button>
          <Link to={`/Channel/${userName}`}>
            <button className='p-2 text-white border-y w-full'>
              View Channel
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
