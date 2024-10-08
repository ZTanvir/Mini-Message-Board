import "./App.css";
import NoticeDetails from "./components/AllNotice/NoticeDetails";
import Notices from "./components/AllNotice/Notices";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [notices, setNotices] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Notices notices={notices} setNotices={setNotices} />}
          />
          <Route
            path="/notice/:id"
            element={
              <NoticeDetails notices={notices} setNotices={setNotices} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
