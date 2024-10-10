import React from "react";
import { FormOne, FormTwo, FormThree } from "../../components";
import { useSelector } from "react-redux";

function Register() {
  const { status, error } = useSelector((state) => state.registerUser);

  return (
    <div className="text-white h-screen w-full flex flex-col gap-10 justify-center items-center p-6">
      <Header />
      {status === 'failed' && <ErrorNotification message={error} />}
      <FormOne />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[10%] w-[35%] flex  items-center">
    <StepBox no={1}/>
    <div className={`w-[40%] h-[2px] ${ false ? "bg-gradient-to-tl to-[#562F7C] from-[#D52F79]": "bg-white"}`} ></div>
    <StepBox no={2}/>
    <div className={`w-[40%] h-[2px] ${ false ? "bg-gradient-to-tl to-[#562F7C] from-[#D52F79]": "bg-white"}`} ></div>
    <StepBox no={3}/>
    </div>
  )
}

function StepBox({no}) {
  return (
    <div className="relative rounded-2xl p-8">
          <div
            className="absolute -inset-px bg-gradient-to-tl to-[#562F7C] to-[70%] from-[#D52F79] "
            aria-hidden="true"
          ></div>
          <div
            className="absolute inset-0 bg-zinc-900 text-white flex text-4xl font-bold justify-center items-center m-[2px]"
            aria-hidden="true"
          >
            {no}
          </div>
        </div>
  )
}

function ErrorNotification({ message }) {
  return (
    <div className="w-full text-center text-red-500 bg-red-100 p-2 rounded">
      {message || "An error occurred. Please try again."}
    </div>
  );
}

export default Register;
