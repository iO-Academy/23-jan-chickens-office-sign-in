import './App.css';
import Home from './Components/Home/Home';
import SignOut from './Components/SignOut/SignOut';
import SignIn from './Components/SignIn/SignIn';
import AdminLogin from './Components/AdminLogin/AdminLogin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInSuccess from './Components/SignIn/SignInSuccess/SignInSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/sign-in/" element={<SignIn />} />
        <Route path="/sign-out/*" element={<SignOut />} />
        <Route path="/sign-in/success" element={<SignInSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
