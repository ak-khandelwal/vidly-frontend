import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GradientBg from "./GradientBg";
import { Link } from "react-router-dom";
import { selectCurrentStatus } from "../../app/slices/authSlice";

function FormOne({
  setFormTurn,
  setUserCredential,
  buttonDisabled,
  setButtonDisabled,
}) {
  const state = useSelector(selectCurrentStatus);
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
    fullName: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserCredential(() => user);
    setFormTurn(() => 1);
  };
  useEffect(() => {
    if (
      [user.fullName, user.email, user.userName, user.password].some(
        (field) => field?.trim() === ""
      )
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user, setButtonDisabled]);

  return (
    <div className="h-[90%] w-[35%] flex flex-col gap-6">
      <div className="relative h-[80%] w-full">
        <GradientBg style1={"w-[100%]"} style3={"flex m-1 flex-col p-4 px-8 "}>
          <Input
            lable={"userName"}
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <Input
            lable={"fullName"}
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
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

          <div className="h-[5%] w-full text-lg text-purple-500 ">
            already have an account
            <Link to={"/login"}>
              <span className="text-xl text-pink-400"> Log In.</span>
            </Link>
          </div>
        </GradientBg>
      </div>
      <Footer
        handleSubmit={handleSubmit}
        buttonDisabled={buttonDisabled}
        loading={state.status == "loading" ? true : false}
      />
    </div>
  );
}

function Input({ lable, value, onChange }) {
  return (
    <div className="w-full h-[20%] flex flex-col mb-4">
      <span className="text-xl h-[40%] text-purple-500">{lable}</span>
      <input
        value={value}
        onChange={onChange}
        className="border border-purple-600  w-full h-[50%] bg-zinc-900 text-white flex text-xl font-bold justify-center items-center outline-none p-2"
        aria-hidden="true"
      />
    </div>
  );
}

function Footer({ handleSubmit, buttonDisabled, loading }) {
  return (
    <div className="h-[10%] w-full flex gap-4 ">
      <GradientBg
        style1={"w-[70%]"}
        style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
      >
        {"Register An Account"}
      </GradientBg>
      <GradientBg
        style1={"w-[30%]"}
        style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
      >
        <button
          onClick={handleSubmit}
          disabled={buttonDisabled || loading}
          className="w-full h-full m-[2px] text-pink-400"
        >
          {loading ? (
            <img
              src="src/assets/loading.svg"
              className="size-10 animate-spin rotate-180"
              alt="dd"
            />
          ) : (
            "NEXT >>"
          )}
        </button>
      </GradientBg>
    </div>
  );
}

export default FormOne;
