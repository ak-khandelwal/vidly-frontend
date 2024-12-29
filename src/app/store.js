import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import channelReducer from "./slices/channelSlice"
import videoReducer from "./slices/videoSlice";
import playlistReducer from "./slices/playListSlice";
import tweetReducer from "./slices/TweetsSlice";
import subscriberReducer from "./slices/SubscriberSlice";
import dashboardRudecer from "./slices/dashboard";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    video: videoReducer,
    playlist: playlistReducer,
    tweet: tweetReducer,
    subscriber: subscriberReducer,
    dashboard: dashboardRudecer,
  }
});
