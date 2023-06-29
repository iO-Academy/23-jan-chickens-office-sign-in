import Home from './Components/Home'
import SignOut from './Components/SignOut'
import SignInForm from "./Components/SignInForm"
import SignInSuccess from './Components/SignInSuccess'
import GenericError from './Components/GenericError'
import AdminLogin from './Components/AdminLogin'
import Admin from './Components/Admin'
import AdminLoginFailure from './Components/AdminLoginFailure'
import NoMatch from './Components/NoMatch'
import AdminToday from './Components/AdminToday'
import BulkSignoutSuccess from './Components/BulkSignoutSuccess'
import AdminHistory from './Components/AdminHistory'
import AdminLoginIncorrect from './Components/AdminLoginIncorrect'
import SignOutSuccess from './Components/SignOutSuccess'
import Nav from './Components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />} >
          <Route path="/" element={<Home />} />
          <Route path="sign-in/" element={<SignInForm />} />
          <Route path="sign-in/success" element={<SignInSuccess />} />
          <Route path="sign-in/failure" element={<GenericError />} />
          <Route path="sign-out/" element={<SignOut />} />
          <Route path="sign-out/success" element={<SignOutSuccess title="Visitor sign-out" message="You have been successfully signed out" links={[]} />} />
          <Route path="sign-out/failure" element={<GenericError />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/login/failure" element={<AdminLoginFailure />} />
          <Route path="/admin/login/incorrect" element={<AdminLoginIncorrect />} />
          <Route path="/admin/logout/failure" element={<GenericError />} />
          <Route path="/admin/today" element={<AdminToday />} />
          <Route path="/admin/today/error" element={<GenericError />} />
          <Route path="/admin/today/bulk-sign-out-success" element={<BulkSignoutSuccess />} />
          <Route path="/admin/today/bulk-sign-out-failure" element={<GenericError />} />
          <Route path="/admin/today/sign-out-success" element={<SignOutSuccess title="Admin visitor sign-out" message="Visitor has been successfully signed out" links={["Back", "Logout"]} />} />
          <Route path="admin/history" element={<AdminHistory />} />
          <Route path="admin/history/error" element={<GenericError />} />
          <Route path="/*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
