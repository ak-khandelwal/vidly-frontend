import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChannelPlaylist from "./pages/ChannelPlaylist";
import ChannelTweets from "./pages/ChannelTweets";
import ChannelSubscribers from "./pages/subsctiptions/ChannelSubscribers";
import SubscribedChannel from "./pages/subsctiptions/SubscribedChannel";
import ChannelVideos from "./pages/videos/ChannelVideos";
import HomeVideos from "./pages/videos/HomeVideos";
import SearchVideo from "./pages/videos/SearchVideo";
import TermsAndConditions from "./pages/LegalAndPolicy/TermsAndConditions";
import PrivacyPolicy from "./pages/LegalAndPolicy/PrivacyPolicy";

// Layouts and others
import AuthLayout from "./components/auth/AuthLayout";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Setting
import ChangeInformation from "./components/setting/ChangeInformation";
import ChangePassword from "./components/setting/ChangePassword";
import SettingLayout from "./components/setting/SettingLayout";

// Channel
import ChannelLayout from "./components/ChannelLayout";
import VideoDetailLayout from "./components/videos/VideoDetailLayout";

// Configure router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <HomeVideos />
          </AuthLayout>
        ),
      },
      {
        path: "/search",
        element: (
          <AuthLayout authentication={false}>
            <SearchVideo />
          </AuthLayout>
        ),
      },
      {
        path: "/Setting",
        element: (
          <AuthLayout authentication>
            <SettingLayout />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <Navigate to="ChangeInfo" replace /> },
          { path: "ChangeInfo", element: <ChangeInformation /> },
          { path: "ChangePassword", element: <ChangePassword /> },
        ],
      },
      {
        path: "/Subscriptions",
        element: (
          <AuthLayout authentication>
            <SubscribedChannel />
          </AuthLayout>
        ),
      },
      {
        path: "/Channel/:userName",
        element: (
          <AuthLayout authentication>
            <ChannelLayout />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <Navigate to="Videos" replace /> },
          { path: "Videos", element: <ChannelVideos /> },
          { path: "PlayList", element: <ChannelPlaylist /> },
          { path: "Tweets", element: <ChannelTweets /> },
          { path: "Subscribed", element: <ChannelSubscribers /> },
        ],
      },
    ],
  },
  {
    path: "/watch/:videoId",
    element: <VideoDetailLayout />,
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Register />
      </AuthLayout>
    ),
  },
  { path: "/TermsAndConditions", element: <TermsAndConditions /> },
  { path: "/PrivacyPolicy", element: <PrivacyPolicy /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </Provider>
  </StrictMode>,
);
