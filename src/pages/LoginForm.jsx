import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectCurrentStatus } from '../app/slices/authSlice';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPlay,
  FaVideo,
  FaUsers,
} from 'react-icons/fa';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(selectCurrentStatus);
  const [user, setUser] = useState({
    email: '',
    password: '',
    userName: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(user)).then((req) => {
      if (req.payload.success) {
        navigate('/');
      }
    });
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
    <div className='min-h-screen w-full flex bg-zinc-900'>
      {/* Content Side */}
      <div className='hidden lg:flex lg:w-1/2 relative px-16 flex-col justify-center'>
        <div className='space-y-8'>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
            Share Your Story
          </h1>
          <p className='text-xl text-gray-300 max-w-lg'>
            Join our community of creators. Upload videos, grow your audience,
            and connect with viewers worldwide.
          </p>

          <div className='space-y-6 mt-12'>
            <FeatureItem
              icon={<FaVideo />}
              title='Create & Share'
              description='Upload your videos in HD quality and share them globally'
            />
            <FeatureItem
              icon={<FaUsers />}
              title='Build Community'
              description='Connect with like-minded creators and grow your audience'
            />
            <FeatureItem
              icon={<FaPlay />}
              title='Monetize Content'
              description='Turn your passion into profit with our creator program'
            />
          </div>
        </div>
      </div>

      {/* Login Form Side */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='bg-zinc-800/50 p-8 rounded-2xl backdrop-blur-sm border border-zinc-700/50'>
            <div className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold text-white'>Welcome Back</h2>
                <p className='text-gray-400'>Sign in to continue creating</p>
              </div>

              <form className='space-y-6' onSubmit={handleSubmit}>
                <Input
                  label='Username'
                  icon={<FaUser />}
                  value={user.userName}
                  onChange={(e) =>
                    setUser({ ...user, userName: e.target.value })
                  }
                  placeholder='Enter your username'
                />

                <Input
                  label='Email'
                  icon={<FaEnvelope />}
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder='Enter your email'
                />

                <Input
                  label='Password'
                  icon={<FaLock />}
                  type='password'
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder='Enter your password'
                />

                <button
                  type='submit'
                  disabled={buttonDisabled || state.status === 'loading'}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                    bg-gradient-to-r from-purple-500 to-pink-500 
                    hover:from-purple-600 hover:to-pink-600 
                    transition-all duration-200 relative
                    ${buttonDisabled || state.status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {state.status === 'loading' ? (
                    <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mx-auto' />
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className='text-center pt-4'>
                <p className='text-gray-400'>
                  New to the platform?{' '}
                  <Link
                    to='/signup'
                    className='text-purple-400 hover:text-purple-300 transition-colors duration-200'
                  >
                    Start Creating
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  icon,
  value,
  onChange,
  type = 'text',
  placeholder,
}) => {
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
        className='w-full bg-zinc-900/80 border border-zinc-700 rounded-lg px-4 py-3 
                 text-white placeholder-gray-500
                 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                 transition-colors duration-200'
      />
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className='flex items-center space-x-4'>
      <div className='w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400'>
        {icon}
      </div>
      <div>
        <h3 className='text-white font-semibold'>{title}</h3>
        <p className='text-gray-400'>{description}</p>
      </div>
    </div>
  );
};

export default LoginForm;
