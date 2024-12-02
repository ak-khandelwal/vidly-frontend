import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/authSlice"
import channelReducer from "../features/channel/slice/channelSlice"
import videoReducer from '../features/videos/slice/videoSlice';
import playlistReducer from '../features/playList/slice/playListSlice';
import tweetReducer from '../features/tweets/slice/TweetsSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    video: videoReducer,
    playlist: playlistReducer,
    tweet: tweetReducer,
  }
});
