import "./App.css";
import NoticeDetails from "./components/AllNotice/NoticeDetails";
import Notices from "./components/AllNotice/Notices";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notices />} />
          <Route path="/notice/:id" element={<NoticeDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
