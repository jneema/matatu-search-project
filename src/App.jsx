import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MatatuRouteFinder from "./containers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MatatuRouteFinder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
