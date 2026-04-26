import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MatatuRouteFinder from "./containers";
import Contribute from "./pages/contribute";
import SavedRoutesView from "./pages/saved-routes-view";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import ForgotPassword from "./pages/auth/forgot-password";
import Admin from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MatatuRouteFinder />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/saved-routes" element={<SavedRoutesView />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
