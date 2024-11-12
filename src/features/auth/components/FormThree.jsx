import { useState } from "react";
import GradientBg from "./GradientBg";
import FileUploader from "./FileUploader";
import defaultCover from "../../../assets/auth/cover.png";

function FormThree({setFormTurn, setCoverImageCredential}) {
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (coverImage) {
      setLoading(true);
      setCoverImageCredential(() => coverImage)
      setFormTurn(()=>3);
      setLoading(false);
    }
  };
  const handleSkip = async () => {
    const coverResponse = await fetch(defaultCover);
    const coverBlob = await coverResponse.blob();
    console.log("coverBlob", coverBlob);

    setLoading(true);
    setCoverImage(coverBlob);
    setCoverImageCredential(() => coverBlob)
    setFormTurn(()=>3);
    setLoading(false);
  }


  return (
    <div className="h-[90%] w-[80%] flex flex-col gap-6">
      <div className={"w-full h-full flex justify-center items-center p-4 px-8 gap-8 m-[2px]"}>
        <FileUploader setImage={setImage} setBulb={setCoverImage} image={image} width="80%" >
          <p>Click to upload coverImage Image</p>
        </ FileUploader>
      </div>


      <Footer handleSubmit={handleUpload} handleSkip={handleSkip} buttonDisabled={!coverImage} loading={loading} />
    </div>
  );
}

function Footer({handleSkip,handleSubmit, buttonDisabled, loading }) {

  return (
    <div className="h-[10%] w-full flex gap-4">
      <GradientBg
        style1={"w-[25%]"}
        style3={"flex text-xl font-bold justify-center items-center m-[2px]"}
      >
        <button
          onClick={handleSkip}
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
        {"coverImage image"}
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

export default FormThree;
