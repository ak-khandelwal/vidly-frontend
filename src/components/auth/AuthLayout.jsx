import { useSelector } from "react-redux";
import { selectCurrentStatus } from "../../app/slices/authSlice";
import LoginPopUp from "./LoginPopUp";

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector(selectCurrentStatus);

  // If authentication is required but the user is not authenticated, show the login popup
  if (authentication && !authStatus) {
    return <LoginPopUp />;
  }

  // If authentication is not required, render children unconditionally
  return <>{children}</>;
}

export default AuthLayout;
