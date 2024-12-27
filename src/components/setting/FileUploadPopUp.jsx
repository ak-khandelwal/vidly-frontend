import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function FileUploadPopUp({
  setImage,
  setBulb,
  image,
  children,
  handleSubmit,
  loading,
  cancelPopUp
}) {
  return (
    <div className="absolute inset-0 m-auto h-[100%] w-[50%] bg-[#00000053] -translate-y-28 translate-x-10 border-4 border-dashed border-purple-900 flex flex-col justify-center items-center text-center ">
      <form className="w-full h-full relative flex items-center justify-center hover:bg-[#49464665] border-b-4  border-dashed border-purple-900">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 input-field w-full h-full opacity-0 cursor-pointer"
          onChange={({ target: { files } }) => {
            files[0] && setBulb(files[0]);

            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        {image ? (
          <img src={image} alt="coverImage-preview" className="size-80" />
        ) : (
          <div>
            <FaCloudUploadAlt className="size-52 pb-8 text-white" />
            <div className="w-full ">{children}</div>
          </div>
        )}
      </form>
      <div className="w-full h-20% flex justify-around bg-[#3623239d]">
        <button
          onClick={cancelPopUp}
          disabled={loading}
          className=" size-20 m-[2px] w-[50%] font-black text-xl text-pink-400 border-r-4  border-dashed border-purple-900"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className=" size-20 m-[2px] font-black text-xl text-pink-400 w-[50%]"
        >
          {loading ? (
            <img
              src="src/assets/loading.svg"
              className="size-10 animate-spin rotate-180"
              alt="loading"
            />
          ) : (
            "UPLOAD"
          )}
        </button>
      </div>
    </div>
  );
}

export default FileUploadPopUp;
