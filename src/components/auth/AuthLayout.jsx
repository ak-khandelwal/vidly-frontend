import { useSelector } from "react-redux";
import { selectCurrentStatus } from "../../app/slices/authSlice";
import LoginPopUp from "./LoginPopUp";

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector(selectCurrentStatus);

  // If authentication is required but the user is not authenticated, show the login popup
  if (authentication && !authStatus) {
    return (
      <div className="text-white h-full w-full flex justify-center items-center p-6">
        <LoginPopUp />
      </div>
    );
  }

  // If authentication is not required, render children unconditionally
  return <>{children}</>;
}

export default AuthLayout;
