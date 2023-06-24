import Home from './Components/Home'
import SignOut from './Components/SignOut'
import SignIn from './Components/SignIn'
import SignInSuccess from './Components/SignInSuccess'
import VisitorError from './Components/VisitorError'
import AdminLogin from './Components/AdminLogin'
import { Admin } from './Components/Admin'
import AdminLoginFailure from './Components/AdminLoginFailure'
import NoMatch from './Components/NoMatch'
import AdminToday from './Components/AdminToday'
import BulkSignoutSuccess from './Components/BulkSignoutSuccess'
import AdminError from './Components/AdminError'
import AdminHistory from './Components/AdminHistory'
import AdminLoginIncorrect from './Components/AdminLoginIncorrect'
import SignOutSuccess from './Components/SignOutSuccess'

import Nav from './Components/Nav'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

function App() {

  // const home = [{name: "Home", path: "/"}]
  // const [links, setLinks] = useState(home)
  // const setNavLinks = (linksArray) => {
  //   setLinks(linksArray)
  // }

  return (
    <BrowserRouter>
    {/* <Nav links={links}/> */}
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
        <Route path="/admin/today/sign-out-success" element={<SignOutSuccess title="Admin visitor sign-out" message="Visitor has been successfully signed out"/>} />
        <Route path="/admin/history" element={ <AdminHistory />} />
        <Route path="/sign-in/" element={<SignIn />} />
        <Route path="/sign-in/success" element={<SignInSuccess />} />
        <Route path="/sign-in/failure" element={<VisitorError />} />
        <Route path="/sign-out/" element={<SignOut />} />
        <Route path="/sign-out/success" element={<SignOutSuccess title="Visitor sign-out" message="You have been successfully signed out"/>} />
        <Route path="/sign-out/failure" element={<VisitorError />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
