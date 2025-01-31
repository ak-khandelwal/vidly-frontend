import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaLock, FaImage, FaIdCard } from 'react-icons/fa';
import { loginUser, registerUser } from '../app/slices/authSlice';
import defaultAvatar from '../assets/auth/avatar.png';
import defaultCover from '../assets/auth/cover.png';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
    fullName: '',
    avatar: null,
    coverImage: null,
  });

  const [previewUrls, setPreviewUrls] = useState({
    avatar: defaultAvatar,
    coverImage: defaultCover,
  });

  useEffect(() => {
    const { email, password, userName, fullName } = formData;
    setButtonDisabled(
      step === 0 &&
        [email, password, userName, fullName].some((field) => !field?.trim()),
    );
  }, [formData, step]);

  // Function to handle default image conversion
  const getDefaultImage = async (imagePath) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error loading default image:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Ensure we have either uploaded or default images
      const avatarBlob =
        formData.avatar || (await getDefaultImage(defaultAvatar));
      const coverBlob =
        formData.coverImage || (await getDefaultImage(defaultCover));

      const registerResult = await dispatch(
        registerUser({
          ...formData,
          avatarBlob,
          coverBlob,
        }),
      );

      if (registerResult?.type === 'registerUser/fulfilled') {
        const loginResult = await dispatch(
          loginUser({
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
          }),
        );

        if (loginResult?.type === 'loginUser/fulfilled') {
          navigate('/TermsAndConditions');
        } else {
          navigate('/login');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (type) => async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [type]: file }));
      setPreviewUrls((prev) => ({
        ...prev,
        [type]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSkip = async (type) => {
    const defaultImage = type === 'avatar' ? defaultAvatar : defaultCover;
    const blob = await getDefaultImage(defaultImage);

    setFormData((prev) => ({ ...prev, [type]: blob }));
    setPreviewUrls((prev) => ({ ...prev, [type]: defaultImage }));
    setStep((prev) => prev + 1);
  };

  const steps = [
    {
      title: 'Basic Information',
      content: (
        <div className='space-y-6'>
          <Input
            label='Full Name'
            icon={<FaIdCard />}
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder='Enter your full name'
          />
          <Input
            label='Username'
            icon={<FaUser />}
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            placeholder='Choose a username'
          />
          <Input
            label='Email'
            icon={<FaEnvelope />}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder='Enter your email'
          />
          <Input
            label='Password'
            icon={<FaLock />}
            type='password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder='Create a password'
          />
        </div>
      ),
    },
    {
      title: 'Profile Picture',
      content: (
        <FileUpload
          title='Upload Profile Picture'
          icon={<FaImage />}
          preview={previewUrls.avatar}
          onChange={handleFileChange('avatar')}
          onSkip={() => handleSkip('avatar')}
          defaultPreview={defaultAvatar}
        />
      ),
    },
    {
      title: 'Cover Image',
      content: (
        <FileUpload
          title='Upload Cover Image'
          icon={<FaImage />}
          preview={previewUrls.coverImage}
          onChange={handleFileChange('coverImage')}
          onSkip={() => handleSkip('coverImage')}
          defaultPreview={defaultCover}
        />
      ),
    },
    {
      title: 'Review',
      content: (
        <ReviewStep
          formData={formData}
          previewUrls={previewUrls}
          onEdit={() => setStep(0)}
          defaultAvatar={defaultAvatar}
          defaultCover={defaultCover}
        />
      ),
    },
  ];

  return (
    <div className='min-h-screen w-full flex bg-zinc-900'>
      {/* Feature Side */}
      <div className='hidden lg:flex lg:w-1/2 relative px-16 flex-col justify-center'>
        <div className='space-y-8'>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
            Join Our Community
          </h1>
          <p className='text-xl text-gray-300 max-w-lg'>
            Create your account, customize your profile, and start sharing your
            story with the world.
          </p>

          <StepIndicator currentStep={step} totalSteps={steps.length} />
        </div>
      </div>

      {/* Form Side */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='bg-zinc-800/50 p-8 rounded-2xl backdrop-blur-sm border border-zinc-700/50'>
            <div className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold text-white'>
                  {steps[step].title}
                </h2>
                <p className='text-gray-400'>
                  Step {step + 1} of {steps.length}
                </p>
              </div>

              <form
                onSubmit={
                  step === steps.length - 1
                    ? handleSubmit
                    : (e) => e.preventDefault()
                }
              >
                {steps[step].content}

                <div className='flex gap-4 mt-8'>
                  {step > 0 && (
                    <button
                      type='button'
                      onClick={() => setStep(step - 1)}
                      className='flex-1 py-3 px-4 rounded-lg text-white font-medium border border-zinc-700 hover:bg-zinc-700/50 transition-all duration-200'
                    >
                      Back
                    </button>
                  )}
                  <button
                    type='button'
                    onClick={() =>
                      step < steps.length - 1
                        ? setStep(step + 1)
                        : handleSubmit()
                    }
                    disabled={buttonDisabled || loading}
                    className='flex-1 py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {loading ? (
                      <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mx-auto' />
                    ) : step === steps.length - 1 ? (
                      'Complete Registration'
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </form>

              <div className='text-center pt-4'>
                <p className='text-gray-400'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='text-purple-400 hover:text-purple-300 transition-colors duration-200'
                  >
                    Sign In
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

const FileUpload = ({
  title,
  icon,
  preview,
  onChange,
  onSkip,
  defaultPreview,
}) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center space-x-2 text-gray-300'>
        <span className='text-purple-400'>{icon}</span>
        <span>{title}</span>
      </div>
      <div className='border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center space-y-4'>
        <img
          src={preview || defaultPreview}
          alt='Preview'
          className='mx-auto max-h-48 rounded object-cover'
        />
        <input
          type='file'
          onChange={onChange}
          accept='image/*'
          className='hidden'
          id='file-upload'
        />
        <label
          htmlFor='file-upload'
          className='inline-block py-2 px-4 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 cursor-pointer hover:bg-purple-500/20 transition-colors duration-200'
        >
          Select Different Image
        </label>
      </div>
      <button
        type='button'
        onClick={onSkip}
        className='text-gray-400 hover:text-gray-300 transition-colors duration-200'
      >
        Use Default Image
      </button>
    </div>
  );
};

const ReviewStep = ({
  formData,
  previewUrls,
  onEdit,
  defaultAvatar,
  defaultCover,
}) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-medium text-white'>Account Details</h3>
          <button
            onClick={onEdit}
            className='text-purple-400 hover:text-purple-300 transition-colors duration-200'
          >
            Edit
          </button>
        </div>
        <div className='space-y-2 text-gray-300'>
          <p>
            <span className='text-gray-500'>Full Name:</span>{' '}
            {formData.fullName}
          </p>
          <p>
            <span className='text-gray-500'>Username:</span> {formData.userName}
          </p>
          <p>
            <span className='text-gray-500'>Email:</span> {formData.email}
          </p>
        </div>
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-white'>Profile Images</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-gray-500 mb-2'>Profile Picture</p>
            <img
              src={previewUrls.avatar || defaultAvatar}
              alt='Avatar'
              className='w-full h-32 object-cover rounded'
            />
            {previewUrls.avatar === defaultAvatar && (
              <p className='text-sm text-gray-500 mt-1'>Using default avatar</p>
            )}
          </div>
          <div>
            <p className='text-gray-500 mb-2'>Cover Image</p>
            <img
              src={previewUrls.coverImage || defaultCover}
              alt='Cover'
              className='w-full h-32 object-cover rounded'
            />
            {previewUrls.coverImage === defaultCover && (
              <p className='text-sm text-gray-500 mt-1'>Using default cover</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className='flex items-center space-x-2'>
      {[...Array(totalSteps)].map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`h-2 w-2 rounded-full ${
              index <= currentStep
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-zinc-700'
            }`}
          />
          {index < totalSteps - 1 && (
            <div
              className={`h-[2px] w-8 ${
                index < currentStep
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-zinc-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RegisterForm;
