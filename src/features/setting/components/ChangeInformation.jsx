import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAccountDetails } from "../../auth/slice/authSlice";
import { toast } from "react-toastify";

function ChangeInformation() {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const onSave = (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      return toast.error("Both fields are required");
    }
    dispatch(updateAccountDetails({ fullName, email }));
  };

  const onCancel = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel?")) {
      setFullName("");
      setEmail("");
    }
  };

  return (
    <div className="flex w-full h-full p-4">
      <div className="w-[40%]">
        <h2 className="font-bold">Personal Info</h2>
        <h3>Update your photo and personal details.</h3>
      </div>
      <div className="h-full w-[60%]">
        <form action="" className="w-full h-[90%] border rounded-lg">
          <div className="h-[80%] border-b-2">
            <div className="w-full h-[50%] p-4 flex flex-col gap-10">
              <div className="w-full h-full">
                <label htmlFor="fullName" className="w-full">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
              <div className="w-full h-full">
                <label htmlFor="Email" className="w-full">
                  Email Address
                </label>
                <input
                  type="email"
                  id="Email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[20%] flex justify-end items-center text-center">
            <button
              onClick={(e) => onCancel(e)}
              className="w-32 h-[60%] text-white border rounded-lg active:translate-x-1 active:translate-y-1 flex items-center justify-center mr-9 select-none"
            >
              Cancel
            </button>
            <button
              onClick={(e) => onSave(e)}
              className="w-32 h-[60%] text-black bg-[#ae7aff] active:translate-x-1 active:translate-y-1 flex items-center justify-center mr-9 select-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeInformation;
