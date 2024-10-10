import { useDispatch, useSelector } from "react-redux";
import { registerUserRequest } from "../../featuers/auth/registerSlice";
import { useEffect, useState } from "react";

function FormOne() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUserRequest(user))
    console.log("Clicked", user);
  }

  useEffect(() => {
    if (
      [user.fullname, user.email, user.username, user.password].some((field) => field?.trim() === "")
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);
  return (
    <div className='h-[90%] w-[35%] flex flex-col gap-6'>
      <div className="relative h-[80%] w-full p-8">
          <div
            className="absolute -inset-px bg-gradient-to-tl to-[#562F7C] to-[70%] from-[#D52F79] "
            aria-hidden="true"
          ></div>
          <form
            className="absolute inset-0 bg-zinc-900 text-white flex flex-col p-4 px-8 gap-8"
            aria-hidden="true"
          >
            <Input
            lable={"UserName"}
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <Input
            lable={"FullName"}
            value={user.fullname}
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            />
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

            <div className='h-[5%] w-full text-lg text-purple-500 '>
            already have an account <span className='text-xl text-pink-400'>Log In.</span>
            </div>
          </form>
    </div>
      <Footer handleSubmit={handleSubmit} buttonDisabled={buttonDisabled} loding={state.registerUser.status == "loading" ? true: false} />
    </div>

  )
}

function Input({lable,value,onChange}){
  return (
    <div className='w-full h-[20%] flex flex-col'>
      <span className='text-xl h-[40%] text-purple-500'>{lable}</span>
      <div className='relative w-full h-[60%]'>
      <div
            className="absolute -inset-px  bg-purple-800"
            aria-hidden="true"
          ></div>
          <input
          value={value}
          onChange={onChange}
            className="absolute inset-0 bg-zinc-900 text-white flex text-xl font-bold justify-center items-center outline-none p-2"
            aria-hidden="true"
          />
      </div>
      </div>
  )
}

function Footer({handleSubmit,buttonDisabled,loding}) {
  return (
    <div className="h-[10%] w-full flex gap-4 ">
      <div className='relative w-[70%] h-full p-8'>
      <div
            className="absolute -inset-px bg-gradient-to-tl to-[#562F7C] to-[70%] from-[#D52F79] "
            aria-hidden="true"
          ></div>
          <div
            className="absolute inset-0 bg-zinc-900 text-white flex text-xl font-bold justify-center items-center m-[2px]"
            aria-hidden="true"
          >
            {"Register An Account"}
          </div>
      </div>
      <div className='relative w-[30%] h-full p-8'>
      <div
            className="absolute -inset-px bg-gradient-to-tl to-[#562F7C] to-[70%] from-[#D52F79] "
            aria-hidden="true"
          ></div>
          <button
            onClick={handleSubmit}
            disabled={buttonDisabled || loding}
            className="absolute inset-0 bg-zinc-900 flex text-xl font-bold justify-center items-center m-[2px] text-pink-400"
            aria-hidden="true"
          >
            {loding ? (
              <img src="src/assets/loding.svg"  className="size-10 animate-spin rotate-180" alt="dd" />
            ): "NEXT >>"}

          </button>
      </div>
    </div>
  )

}

export default FormOne