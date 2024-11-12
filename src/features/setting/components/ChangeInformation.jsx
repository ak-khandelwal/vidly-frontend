function ChangeInformation() {
  return (
    <div className="flex w-full h-full p-4">
      <div className=" w-[40%]">
        <h2 className="font-bold">Personal Info</h2>
        <h3>Update your photo and personal details.</h3>
      </div>
      <div className=" w-[60%]">
        <form action="" className="w-full h-[100%] border rounded-lg">
          <div className="h-[80%] border-b-2">
            <div className="w-full h-[50%] p-4 flex flex-col gap-3">
              <div className="w-full h-full">
                <label htmlFor="fullName" className="w-full">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
              <div className="w-full h-full">
                <label htmlFor="userName" className="w-full">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
              <div className="w-full h-full">
                <label htmlFor="Email" className="w-full">
                  Email Address
                </label>
                <input
                  type="text"
                  id="Email"
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[20%] flex justify-end items-center text-center">
          <button className="w-32 h-[60%] text-white border rounded-lg active:translate-x-1 active:translate-y-1 flex items-center justify-center mr-9 select-none">Cancel</button>
          <button className="w-32 h-[60%] text-black bg-[#ae7aff] active:translate-x-1 active:translate-y-1 flex items-center justify-center mr-9 select-none" >Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeInformation;
