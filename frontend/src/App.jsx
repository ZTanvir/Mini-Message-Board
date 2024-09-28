import "./App.css";
import Notices from "./components/AllNotice/Notices";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notices />} />
          <Route path="/profile" element={<Notices />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
