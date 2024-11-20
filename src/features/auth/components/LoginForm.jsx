import { useEffect, useState } from 'react'
import GradientBg from './GradientBg'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, selectCurrentStatus } from '../slice/authSlice';
import { toast } from 'react-toastify';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const state = useSelector(selectCurrentStatus);
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(user))
    .then((req) => {
      if(req.payload.success){
        navigate("/")
      }
    })
  }

  useEffect(() => {
    if (
      [user.fullName, user.email, user.userName, user.password].some((field) => field?.trim() === "")
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className='h-[90%] w-[35%] flex flex-col gap-6 '>
      <div className="relative h-[80%] w-full">
        <GradientBg style1={"w-[100%]"} style3={"flex m-1 flex-col justify-between p-8 px-8 "} >
            <Input
            lable={"user name"}
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })} />
            <Input
            lable={"Email Id"}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
            lable={"Password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <div className='h-[5%] w-full text-lg text-purple-500 mb-4 '>
            Create an account
            <Link to={"/signup"}>
              <span  className='text-xl text-pink-400'> Sign Up.</span>
            </Link>
            </div>
        </GradientBg>
      </div>
      <Footer handleSubmit={handleSubmit} buttonDisabled={buttonDisabled} loading={state.status === "loading" ? true: false} />
    </div>
  )
}

function Input({lable,value,onChange}){
  return (
    <div className='w-full h-[20%] flex flex-col'>
      <span className='text-xl h-[40%] text-purple-500'>{lable}</span>
          <input
          value={value}
          onChange={onChange}
            className="border border-purple-600  w-full h-[50%] bg-zinc-900 text-white flex text-xl font-bold justify-center items-center outline-none p-2"
            aria-hidden="true"
          />
      </div>
  )
}

function Footer({handleSubmit,buttonDisabled,loding}) {
  return (
    <div className="h-[10%] w-full flex gap-4 ">
      <GradientBg  style1={"w-[70%]"} style3={"flex text-xl font-bold justify-center items-center m-[2px]"} >
      {"Login An Account"}
      </GradientBg>
      <GradientBg style1={"w-[30%]"} style3={"flex text-xl font-bold justify-center items-center m-[2px]"} >
        <button
            onClick={handleSubmit}
            disabled={buttonDisabled || loding}
            className="w-full h-full m-[2px] text-pink-400 flex items-center justify-center"
          >
            {loding ? (
              <img src="src/assets/loding.svg"  className="size-10 animate-spin rotate-180" alt="dd" />
            ): "NEXT >>"}

          </button>
      </GradientBg>
    </div>
  )

}

export default LoginForm