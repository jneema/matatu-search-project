import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MatatuRouteFinder from "./containers";
import Feedback from "./pages/feedback";
import SavedRoutesView from "./pages/saved-routes-view";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MatatuRouteFinder />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/saved-routes" element={<SavedRoutesView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
