import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/main/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import SiteAdmin from "./pages/auth/SiteAdmin";
import SignInInfo from "./pages/auth/SignInInfo";
import Dashboard from "./pages/main/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/siteadmin" element={<SiteAdmin />} />
        <Route path="/signininfo" element={<SignInInfo />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
