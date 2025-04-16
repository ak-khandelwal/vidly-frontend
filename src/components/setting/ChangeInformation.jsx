import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateAccountDetails } from "../../app/slices/authSlice";
import {
  RiUser3Line,
  RiMailLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

function ChangeInformation() {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSave = async (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      return toast.error("Both fields are required");
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateAccountDetails({ fullName, email }));
      toast.success("Personal information updated successfully");
    } catch (error) {
      toast.error("Failed to update information");
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
      setFullName("");
      setEmail("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold text-white mb-2">Personal Info</h2>
          <p className="text-gray-400">
            Update your personal details and contact information.
          </p>
        </div>

        <div className="md:w-2/3">
          <form className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 space-y-6 border-b border-zinc-700">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <RiUser3Line className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <RiMailLine className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  />
                </div>
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
                    Saving...
                  </span>
                ) : (
                  <>
                    <RiCheckLine /> Save Changes
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

export default ChangeInformation;
