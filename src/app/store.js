import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/authSlice"
import channelReducer from "../features/channel/slice/channelSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
  },
});
