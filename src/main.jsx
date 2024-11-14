import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import BaseLayout from "./features/common/components/BaseLayout";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import TermsAndConditions from "./features/LegalAndPolicy/components/TermsAndConditions";
import {
  ChangeInformation,
  ChangePassword,
  SettingLayout,
} from "./features/setting";
import {
  ChannelLayout,
  PlayList,
  Subscribed,
  Tweets,
  Videos,
} from "./features/channel/index";
import AuthLayout from './features/auth/components/AuthLayout';
const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
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
        path: "/Channel",
        element: (
          <AuthLayout authentication>
            <ChannelLayout />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <Navigate to="Videos" replace /> },
          { path: "Videos", element: <Videos /> },
          { path: "PlayList", element: <PlayList /> },
          { path: "Tweets", element: <Tweets /> },
          { path: "Subscribed", element: <Subscribed /> },
        ],
      },
    ],
  },
  { path: "/login", element: (
    <AuthLayout authentication={false}>
      <Login />
    </AuthLayout>
  ) },
  { path: "/signup", element: (
    <AuthLayout authentication={false}>
      <Register />
    </AuthLayout>
  )  },
  { path: "/TermsAndConditions", element: <TermsAndConditions /> },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

