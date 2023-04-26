import { useState } from 'react'
import Home from './components/Home/Home'
import SignOut from './components/SignOut/SignOut'
import SignIn from './components/SignIn/SignIn'
import SignInSuccess from './components/SignIn/SignInSuccess/SignInSuccess';
import SignInFailure from './components/SignIn/SignInFailure/SignInFailure';
import AdminLogin from './components/AdminLogin/AdminLogin'
import Admin from './components/Admin/Admin'
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
