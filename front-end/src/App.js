import Home from './Components/Home'
import SignOut from './Components/SignOut'
import SignIn from './Components/SignIn'
import SignInSuccess from './Components/SignInSuccess'
import SignInFailure from './Components/SignInFailure'
import AdminLogin from './Components/AdminLogin'
import Admin from './Components/Admin'
import AdminLoginFailure from './Components/AdminLoginFailure'

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLoginIncorrect from './Components/AdminLoginIncorrect'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin setLoggedIn={setLoggedIn} />} />
        <Route path="/admin-login/failure" element={<AdminLoginFailure />} />
        <Route path="/admin-login/incorrect" element={<AdminLoginIncorrect />} />
        <Route path="/admin" element={loggedIn ? <Admin /> : <AdminLogin />} />
        <Route path="/sign-in/" element={<SignIn />} />
        <Route path="/sign-in/success" element={<SignInSuccess />} />
        <Route path="/sign-in/failure" element={<SignInFailure />} />
        <Route path="/sign-out/*" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
