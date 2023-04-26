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

function App() {

  const [sessionId, setSessionId] = useState(false)
  const checkSession = (nextState, replace, next) => {
    //fetch get request to /checkLogin
    let authenticated = false
    if (!authenticated) {
      replace({
        pathname: "/admin-login",
        state: { nextPathname: nextState.location.pathname }
      })
    }
    next()
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-login/failure" element={<AdminLoginFailure />} />
        <Route path="/admin" element={<Admin />} onEnter={checkSession} />
        <Route path="/sign-in/" element={<SignIn />} />
        <Route path="/sign-in/success" element={<SignInSuccess />} />
        <Route path="/sign-in/failure" element={<SignInFailure />} />
        <Route path="/sign-out/*" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
