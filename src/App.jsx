import { Navigate, Route, Routes } from "react-router-dom"
import BaseLayout from "./features/common/components/BaseLayout"
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import TermsAndConditions from "./features/LegalAndPolicy/components/TermsAndConditions";
import { ChangeInformation, ChangePassword, SettingLayout } from "./features/setting";
import {ChannelLayout,PlayList,Subscribed,Tweets,Videos } from "./features/channel/index";
function App() {
  return (
    <div className="h-screen bg-black">
    <Routes>
      <Route path="/" element={<BaseLayout />} >
      <Route path="/Setting" element={<SettingLayout />}>
        <Route index element={<Navigate to="ChangeInfo" replace />} />
        <Route  path="ChangeInfo"  element={< ChangeInformation />} />
        <Route path="ChangePassword" element={< ChangePassword />} />
      </Route>
      <Route path="/Channel" element={<ChannelLayout />}>
        <Route index element={<Navigate to="Videos" replace />} />
        <Route  path="Videos"  element={< Videos />} />
        <Route path="PlayList" element={< PlayList />} />
        <Route path="Tweets" element={< Tweets />} />
        <Route path="Subscribed" element={< Subscribed />} />
      </Route>
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Register />}/>
      <Route path="/TermsAndConditions" element={<TermsAndConditions />}/>
    </Routes>
    </div>
  )
}

export default App