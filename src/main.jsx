import { Analytics } from '@vercel/analytics/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

// Pages
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';
import ChannelPlaylist from './pages/ChannelPlaylist';
import ChannelTweets from './pages/ChannelTweets';
import ChannelSubscribers from './pages/ChannelSubscribers';
import SubscribedChannel from './pages/SubscribedChannel';
import ChannelVideos from './pages/ChannelVideos';
import HomeVideos from './pages/HomeVideos';
import SearchVideo from './pages/SearchVideo';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import History from './pages/History';
import Playlist from './pages/Playlist';

// Layouts and others
import AuthLayout from './components/auth/AuthLayout';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Setting
import ChangeInformation from './components/setting/ChangeInformation';
import ChangePassword from './components/setting/ChangePassword';
import SettingLayout from './components/setting/SettingLayout';

// Channel
import ChannelLayout from './components/ChannelLayout';
import VideoDetailLayout from './components/videos/VideoDetailLayout';
import Dashboard from './pages/Dashboard';
import DashboardContent from './pages/DashboardContent';
import ContentVideo from './components/dashboard/ContentVideo';
import ContentTweets from './components/dashboard/ContentTweets';
import ContentPlaylist from './components/dashboard/ContentPlaylist';

// Configure router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={false}>
            <HomeVideos />
          </AuthLayout>
        ),
      },
      {
        path: '/search',
        element: (
          <AuthLayout authentication={false}>
            <SearchVideo />
          </AuthLayout>
        ),
      },
      {
        path: '/Setting',
        element: (
          <AuthLayout authentication>
            <SettingLayout />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <Navigate to='ChangeInfo' replace /> },
          { path: 'ChangeInfo', element: <ChangeInformation /> },
          { path: 'ChangePassword', element: <ChangePassword /> },
        ],
      },
      {
        path: '/Subscriptions',
        element: (
          <AuthLayout authentication>
            <SubscribedChannel />
          </AuthLayout>
        ),
      },
      {
        path: '/History',
        element: (
          <AuthLayout authentication>
            <History />
          </AuthLayout>
        ),
      },
      {
        path: '/Playlist/:playListId',
        element: (
          <AuthLayout authentication>
            <Playlist />
          </AuthLayout>
        ),
      },
      {
        path: '/Channel/:userName',
        element: (
          <AuthLayout authentication>
            <ChannelLayout />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <Navigate to='Videos' replace /> },
          { path: 'Videos', element: <ChannelVideos /> },
          { path: 'PlayList', element: <ChannelPlaylist /> },
          { path: 'Tweets', element: <ChannelTweets /> },
          { path: 'Subscribed', element: <ChannelSubscribers /> },
        ],
      },
    ],
  },
  {
    path: '/watch/:videoId',
    element: <VideoDetailLayout />,
  },
  {
    path: '/login',
    element: (
      <AuthLayout authentication={false}>
        <LoginForm />
      </AuthLayout>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthLayout authentication={false}>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: '/Dashboard',
    element: <Dashboard />,
    children: [
      { index: true, element: <Navigate to='Content' replace /> },
      {
        path: 'Content',
        element: <DashboardContent />,
        children: [
          { index: true, element: <Navigate to='videos' replace /> },
          { path: 'videos', element: <ContentVideo /> },
          { path: 'tweets', element: <ContentTweets /> },
          { path: 'Playlists', element: <ContentPlaylist /> },
        ],
      },
    ],
  },
  { path: '/TermsAndConditions', element: <TermsAndConditions /> },
  { path: '/PrivacyPolicy', element: <PrivacyPolicy /> },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Analytics />
      <RouterProvider router={router} />
      <ToastContainer position='top-right' />
    </Provider>
  </StrictMode>,
);
