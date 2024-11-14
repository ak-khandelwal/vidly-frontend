import {Outlet} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/slice/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="h-screen bg-black">
      <Outlet />
    </div>
  );
}

export default App;
