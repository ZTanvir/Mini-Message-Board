import "./App.css";
import NoticeDetails from "./components/AllNotice/NoticeDetails";
import Notices from "./components/AllNotice/Notices";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [noticeDetails, setNoticeDetails] = useState("");
  const [notices, setNotices] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Notices
                notices={notices}
                setNotices={setNotices}
                noticeDetails={noticeDetails}
                setNoticeDetails={setNoticeDetails}
              />
            }
          />
          <Route
            path="/notice/:id"
            element={
              <NoticeDetails
                id={noticeDetails.id}
                first_name={noticeDetails.first_name}
                last_name={noticeDetails.last_name}
                notice={noticeDetails.notice}
                description={noticeDetails.description}
                date={noticeDetails.date}
                notices={notices}
                setNotices={setNotices}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
