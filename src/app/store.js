import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/authSlice"
import channelReducer from "../features/channel/slice/channelSlice"
import videoReducer from '../features/videos/slice/videoSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    video: videoReducer,
  },
});
