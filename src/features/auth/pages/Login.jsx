import { LoginForm }  from "../components/index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  return (
    <div className='text-white h-screen w-full flex flex-col gap-10 justify-center items-center p-6'>
      <ToastContainer />
      <LoginForm />
    </div>
  )
}

export default Login