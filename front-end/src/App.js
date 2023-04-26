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
import AdminHistory from './Components/AdminHistory'
import AdminLoginIncorrect from './Components/AdminLoginIncorrect'

import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-login/failure" element={<AdminLoginFailure />} />
        <Route path="/admin-login/incorrect" element={<AdminLoginIncorrect />} />
        <Route path="/admin" element={!Cookies.get('connect.sid') ? <Admin /> : <Navigate to="/admin-login" />} />
        <Route path="/admin/today" element={!Cookies.get('connect.sid') ? <AdminToday /> : <Navigate to="/admin-login" />} />
        <Route path="/admin/history" element={!Cookies.get('connect.sid') ? <AdminHistory /> : <Navigate to="/admin-login" />} />
        <Route path="/sign-in/" element={<SignIn />} />
        <Route path="/sign-in/success" element={<SignInSuccess />} />
        <Route path="/sign-in/failure" element={<SignInFailure />} />
        <Route path="/sign-out/*" element={<SignOut />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
