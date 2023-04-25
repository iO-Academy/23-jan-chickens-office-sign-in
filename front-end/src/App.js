import './App.css';
import { useState } from 'react'
import Home from './Components/Home/Home';
import SignOut from './Components/SignOut/SignOut';
import SignIn from './Components/SignIn/SignIn';
import AdminLogin from './Components/AdminLogin/AdminLogin'
import Admin from './Components/Admin/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInSuccess from './Components/SignIn/SignInSuccess/SignInSuccess';

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
        <Route path="/sign-out/*" element={<SignOut />} />
        <Route path="/sign-in/success" element={<SignInSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
