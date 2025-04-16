import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { passwordChange } from "../../app/slices/authSlice";
import {
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

function ChangePassword() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirmation don't match");
    }

    setIsSubmitting(true);
    try {
      const res = await dispatch(passwordChange({ oldPassword, newPassword }));
      if (res?.type === "passwordChange/fulfilled") {
        toast.success("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost.",
      )
    ) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold text-white mb-2">Password</h2>
          <p className="text-gray-400">
            Please enter your current password to change your password. Use a
            strong, unique password to keep your account secure.
          </p>
        </div>

        <div className="md:w-2/3">
          <form className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 space-y-6 border-b border-zinc-700">
              <div>
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <RiLockLine className="text-gray-500" />
                  </div>
                  <input
                    type={showPasswords.old ? "text" : "password"}
                    id="oldPassword"
                    placeholder="Enter your current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full py-3 pl-10 pr-12 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                    onClick={() => togglePasswordVisibility("old")}
                  >
                    {showPasswords.old ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <RiLockLine className="text-gray-500" />
                  </div>
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full py-3 pl-10 pr-12 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPasswords.new ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <RiLockLine className="text-gray-500" />
                  </div>
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-3 pl-10 pr-12 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPasswords.confirm ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                {newPassword &&
                  confirmPassword &&
                  newPassword !== confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      Passwords don't match
                    </p>
                  )}
              </div>
            </div>

            <div className="p-6 flex justify-end items-center space-x-4">
              <button
                onClick={onCancel}
                className="px-5 py-2 border border-zinc-600 rounded-lg text-gray-300 hover:bg-zinc-700 transition-colors duration-300 flex items-center gap-2"
                disabled={isSubmitting}
              >
                <RiCloseLine /> Cancel
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors duration-300 flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  <>
                    <RiCheckLine /> Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
