import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { passwordChange } from "../../app/slices/authSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const onSave = async (e) => {
    e.preventDefault();
    if(!oldPassword || !newPassword){
      return toast.error("all felids are required")
    }
    if (newPassword !== conformPassword) {
      return toast.error("wrong conform password");
    }
    const res = await dispatch(passwordChange({ oldPassword,newPassword }));
    if (res?.type === "passwordChange/fulfilled") {
      toast.success("Successfully changed account details");
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel?")) {
      setOldPassword("");
      setNewPassword("");
      setConformPassword("");
    }
  };
  return (
    <div className="flex w-full h-full p-4">
      <div className=" w-[40%]">
        <h2 className="font-bold">Password</h2>
        <h3>Please enter your current password to change <br />your password.</h3>
      </div>
      <div className=" w-[60%]">
        <form action="" className="w-full h-[100%] border rounded-lg">
          <div className="h-[80%] border-b-2">
            <div className="w-full h-[50%] p-4 flex flex-col gap-3">
              <div className="w-full h-full">
                <label htmlFor="CurrentPassword" className="w-full">
                  Old password
                </label>
                <input
                  type="text"
                  id="CurrentPassword"
                  placeholder="Enter your current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
              <div className="w-full h-full">
                <label htmlFor="newPassword" className="w-full">
                  New Password
                </label>
                <input
                  type="text"
                  id="newPassword"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
              <div className="w-full h-full">
                <label htmlFor="confirmPassword" className="w-full">
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="confirmPassword"
                  placeholder="Enter your confirm password"
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                  className="w-full border rounded-xl bg-black text-white flex justify-center items-center outline-none p-2 mt-2"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[20%] flex justify-end items-center text-center">
          <button
          onClick={(e) => onCancel(e)}
          className="w-32 h-[60%] text-white border rounded-lg active:translate-x-1 active:translate-y-1 flex items-center justify-center mr-9 select-none">Cancel</button>
          <button
          onClick={(e) => onSave(e)}
          className="w-32 h-[60%] text-black bg-[#ae7aff] active:translate-x-1 active:translate-y-1 flex items-center justify-center mr-9 select-none" >Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword
