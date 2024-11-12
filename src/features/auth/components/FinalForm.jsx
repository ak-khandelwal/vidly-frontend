import { useState } from "react";
import GradientBg from "./GradientBg";

function FinalForm({
  setFormTurn,
  handleSubmit,
  loading,
  userCredential,
  avatarCredential,
  coverImageCredential,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { email, password, userName, fullName } = userCredential;
  const avatarImage =
    avatarCredential !== null
      ? URL.createObjectURL(avatarCredential)
      : "src/assets/auth/avatar.svg";
  const coverImage =
    coverImageCredential !== null
      ? URL.createObjectURL(coverImageCredential)
      : "src/assets/auth/cover.svg";

  const handleEdit = () => {
    setFormTurn(0);
  };

  return (
    <div className="h-[90%] w-[70%] flex gap-4">
      <div className="relative h-full w-[70%]">
        <GradientBg>
          <div className="h-[60%] w-[80%] flex items-center gap-16 ml-14 ">
            <div className="flex flex-col gap-14">
              <span className="font-semibold text-purple-700 text-xl">
                fullName
              </span>
              <span className="font-semibold text-purple-700 text-xl">
                userName
              </span>
              <span className="font-semibold text-purple-700 text-xl">
                Email
              </span>
              <span className="font-semibold text-purple-700 text-xl">
                Password
              </span>
            </div>
            <div className="flex flex-col gap-14 ">
              <span className="text-xl font-extrabold">:</span>
              <span className="text-xl font-extrabold">:</span>
              <span className="text-xl font-extrabold">:</span>
              <span className="text-xl font-extrabold">:</span>
            </div>
            <div className="flex flex-col gap-14 ">
              <span className="text-xl text-pink-500">{fullName}</span>
              <span className="text-xl text-pink-500">{userName}</span>
              <span className="text-xl text-pink-500">{email}</span>
              <span className="text-xl text-pink-500">
                {showPassword ? password : "*".repeat(password?.length)}
              </span>
            </div>
          </div>
          <div className="h-[30%] w-[80%] flex items-center gap-16 ml-14 mt-4">
            <div className="flex flex-col gap-5">
              <span className="font-semibold text-purple-700 text-xl">
                avatar Image
              </span>
              <span className="font-semibold text-purple-700 text-xl">
                cover Image
              </span>
            </div>
            <div className="flex flex-col gap-14 ">
              <span className="text-xl font-extrabold">:</span>
              <span className="text-xl font-extrabold">:</span>
            </div>
            <div className="flex flex-col w-[70%] items-end gap-4 ">
              <img
                src={avatarImage}
                alt="avatarImage-preview"
                className=" border size-24"
              />
              <img
                src={coverImage}
                alt="coverImage-preview"
                className=" border size-24"
              />
            </div>
          </div>
        </GradientBg>
      </div>
      <div className="w-[30%] ">
        <Footer handleRegister={handleSubmit} handleEdit={handleEdit} loading={loading} />
      </div>
    </div>
  );
}

function Footer({ handleEdit, handleRegister, loading }) {
  return (
    <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-[60%] h-[15%]">
        <GradientBg
          style1={"w-full "}
          style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
        >
          <button
            onClick={handleEdit}
            className="w-full h-full m-[2px] text-pink-400"
          >
            {loading ? (
              <img
                src="src/assets/loading.svg"
                className="size-10 animate-spin rotate-180"
                alt="loading"
              />
            ) : (
              "<< EDIT DETAILS"
            )}
          </button>
        </GradientBg>
      </div>
      <div className="w-[80%] h-[50%]">
        <GradientBg
          style1={"w-full"}
          style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
        >
          {"CONFIRM DETAILS"}
        </GradientBg>
      </div>
      <div className="w-[60%] h-[15%]">
        <GradientBg
          style1={"w-full"}
          style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
        >
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-full m-[2px] text-pink-400"
          >
            {loading ? (
              <img
                src="src/assets/loading.svg"
                className="size-10 animate-spin rotate-180"
                alt="loading"
              />
            ) : (
              "REGISTER >>"
            )}
          </button>
        </GradientBg>
      </div>
    </div>
  );
}

export default FinalForm;
