import { useState } from "react";
import GradientBg from "./GradientBg";
import FileUploader from "./FileUploader";
import defaultAvatar from "../../../assets/auth/avatar.png";

function FormTwo({setFormTurn, setAvatarCredential}) {
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (avatar) {
      setLoading(true);
      setAvatarCredential(() => avatar);
      setFormTurn(() => 2)
      setLoading(false)
    }
  };
  const handleSkip = async () => {
    const avatarResponse = await fetch(defaultAvatar);
    const avatarBlob = await avatarResponse.blob();

    setLoading(true);
    setAvatarCredential(() => avatarBlob)
    setFormTurn(() => 2)
    setLoading(false);
  }


  return (
    <div className="h-[90%] w-[80%] flex flex-col gap-6">
      <GradientBg style1={"w-full p-8"} style3={"flex p-4 px-8 gap-8 m-[2px]"}>
        <AvatarGenerator />
        <FileUploader setImage={setImage} setBulb={setAvatar} image={image} width="80%" height="100%" >
        <p>Click to upload avatar Image</p>
        <p>Or choose from left side</p>
        </ FileUploader>
      </GradientBg>
      {/* Pass the handleUpload function to the Footer component */}
      <Footer handleSubmit={handleUpload} handleSkip={handleSkip} buttonDisabled={!image} loading={loading} />
    </div>
  );
}

function AvatarGenerator() {
  return (
    <GradientBg style1={"w-[60%]"} style3={"flex p-4 px-8 gap-8 m-[2px]"}>
      Comming Soon.....
    </GradientBg>
  );
}

function Footer({ handleSkip, handleSubmit, buttonDisabled, loading }) {
  return (
    <div className="h-[10%] w-full flex gap-4">
      <GradientBg
        style1={"w-[25%]"}
        style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
      >
        <button
          onClick={handleSkip} // Upload avatar image when clicked
          className="w-full h-full m-[2px] text-pink-400"
        >
          {loading ? (
            <img
              src="src/assets/loading.svg"
              className="size-10 animate-spin rotate-180"
              alt="loading"
            />
          ) : (
            "SKIP >>"
          )}
        </button>
      </GradientBg>
      <GradientBg
        style1={"w-[50%]"}
        style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
      >
        {"Avatar image"}
      </GradientBg>
      <GradientBg
        style1={"w-[25%]"}
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
              alt="loading"
            />
          ) : (
            "UPLOAD >>"
          )}
        </button>
      </GradientBg>
    </div>
  );
}

export default FormTwo;
