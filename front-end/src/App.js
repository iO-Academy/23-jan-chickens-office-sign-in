import Home from './Components/Home'
import SignOut from './Components/SignOut'
import SignIn from './Components/SignIn'
import SignInSuccess from './Components/SignInSuccess'
import SignInFailure from './Components/SignInFailure'
import AdminLogin from './Components/AdminLogin'
import Admin from './Components/Admin'
import AdminLoginFailure from './Components/AdminLoginFailure'
import NoMatch from './Components/NoMatch'
import AdminToday from './Components/AdminToday'
import BulkSignoutSuccess from './Components/BulkSignoutSuccess'
import AdminError from './Components/AdminError'
import AdminHistory from './Components/AdminHistory'
import AdminLoginIncorrect from './Components/AdminLoginIncorrect'
import SignOutSuccess from './Components/SignOutSuccess'
import SignOutFailure from './Components/SignOutFailure'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-login/failure" element={<AdminLoginFailure />} />
        <Route path="/admin-login/incorrect" element={<AdminLoginIncorrect />} />
        <Route path="/admin-logout/failure" element={<AdminError />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/today" element={<AdminToday />} />
        <Route path="/admin/today/bulk-sign-out-success" element={ <BulkSignoutSuccess />} />
        <Route path="/admin/today/bulk-sign-out-failure" element={<AdminError />} />
        <Route path="/admin/history" element={ <AdminHistory />} />
        <Route path="/sign-in/" element={<SignIn />} />
        <Route path="/sign-in/success" element={<SignInSuccess />} />
        <Route path="/sign-in/failure" element={<SignInFailure />} />
        <Route path="/sign-out/" element={<SignOut />} />
        <Route path="/sign-out/success" element={<SignOutSuccess />} />
        <Route path="/sign-out/failure" element={<SignOutFailure />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
