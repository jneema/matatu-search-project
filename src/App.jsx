import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MatatuRouteFinder from "./containers";
import Feedback from "./pages/feedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MatatuRouteFinder />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
