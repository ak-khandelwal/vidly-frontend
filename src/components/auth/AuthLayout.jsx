import { useSelector } from 'react-redux';
import { selectCurrentStatus } from '../../app/slices/authSlice';
import LoginPopUp from './LoginPopUp';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector(selectCurrentStatus);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  if (authentication && !authStatus) {
    return (
      <div className='text-white h-full w-full flex justify-center items-center p-6'>
        <LoginPopUp onClose={handleClose} />
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthLayout;
