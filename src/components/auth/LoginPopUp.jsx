import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser, selectCurrentStatus } from '../../app/slices/authSlice';
import { FaUser, FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';

function LoginPopUp({ onClose }) {
  const dispatch = useDispatch();
  const state = useSelector(selectCurrentStatus);
  const [user, setUser] = useState({
    email: '',
    password: '',
    userName: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (
      [user.fullName, user.email, user.userName, user.password].some(
        (field) => field?.trim() === '',
      )
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='relative w-full sm:w-[440px] bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-400 hover:text-white transition-colors'
        >
          <FaTimes size={20} />
        </button>

        {/* Header */}
        <div className='p-6 border-b border-zinc-800'>
          <h2 className='text-2xl font-bold text-white'>Welcome Back</h2>
          <p className='text-gray-400 mt-1'>Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <div className='p-6 space-y-6'>
          <Input
            label='Username'
            icon={<FaUser />}
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            placeholder='Enter your username'
          />

          <Input
            label='Email'
            icon={<FaEnvelope />}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder='Enter your email'
            type='email'
          />

          <Input
            label='Password'
            icon={<FaLock />}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder='Enter your password'
            type='password'
          />

          <div className='flex items-center justify-between pt-4'>
            <p className='text-gray-400'>
              New here?{' '}
              <Link
                to='/signup'
                className='text-purple-400 hover:text-purple-300 transition-colors'
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='p-6 bg-zinc-800/50 rounded-b-xl flex gap-4'>
          <button
            onClick={handleSubmit}
            disabled={buttonDisabled || state.status === 'loading'}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 
              ${
                buttonDisabled || state.status === 'loading'
                  ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
              }`}
          >
            {state.status === 'loading' ? (
              <div className='flex items-center justify-center'>
                <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full' />
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, value, onChange, type = 'text', placeholder }) {
  return (
    <div className='space-y-2'>
      <label className='flex items-center space-x-2 text-gray-300'>
        <span className='text-purple-400'>{icon}</span>
        <span>{label}</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 
                 text-white placeholder-gray-500
                 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                 transition-colors duration-200'
      />
    </div>
  );
}

export default LoginPopUp;
