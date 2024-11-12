function FileUploader({ setImage, setBulb, image, width, children}) {
  return (
    <main className={`w-[${width}] h-full border-4 border-dashed border-purple-900 flex flex-col justify-center items-center text-center m-[2px]`}>
      <form
        className="w-full h-full relative flex items-center justify-center hover:bg-[#49464665]"
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 input-field w-full h-full opacity-0 cursor-pointer"
          onChange={({ target: { files } }) => {
            files[0] && setBulb(files[0]);
            console.log(files);

            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        {image ? (
          <img src={image} alt="coverImage-preview" className="size-80" />
        ) : (
          <div>
            <img src="src/assets/auth/upload.svg" className="size-52 pb-8" />
            <div className="w-full ">
              {children}
            </div>
          </div>
        )}
      </form>
    </main>
  );
}


export default FileUploader