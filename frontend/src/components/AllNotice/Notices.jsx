import { useEffect, useState } from "react";
import Notice from "./Notice";
import NoticeDetails from "./NoticeDetails";
import NoticesService from "../../services/notices";
import ToggleElement from "../ToggleElement";
import FormField from "../Form/FormField";
import NoticeFromData from "../Form/NoticeFormData";

const Notices = ({}) => {
  const [notices, setNotices] = useState([]);
  const [noticeDetails, setNoticeDetails] = useState("");

  const handleNotice = (e) => {
    const noticeId = Number(e.currentTarget.dataset.noticeid);
    const getNoticeDetails = notices.filter((notice) => notice.id === noticeId);
    const noticeData = getNoticeDetails.length > 0 ? getNoticeDetails[0] : "";
    setNoticeDetails(noticeData);
  };

  const handleAddNewNotice = (e) => {};

  useEffect(() => {
    const getNotices = async () => {
      try {
        const data = await NoticesService.getAll();
        setNotices([...data]);
      } catch (error) {
        console.error(error);
      }
    };
    getNotices();
  }, []);

  return (
    <>
      <h1>Notice board</h1>
      <ToggleElement btnText={"Add Notice"}>
        <FormField
          handleForm={handleAddNewNotice}
          formName={"addNotice"}
          formData={NoticeFromData}
        />
      </ToggleElement>
      {Boolean(notices.length > 0)
        ? notices.map((notice) => (
            <Notice
              key={notice.id}
              id={notice.id}
              title={notice.notice}
              firstName={notice.first_name}
              lastName={notice.last_name}
              date={notice.date}
              handleNotice={handleNotice}
            />
          ))
        : null}
      {noticeDetails && (
        <NoticeDetails
          id={noticeDetails.id}
          first_name={noticeDetails.first_name}
          last_name={noticeDetails.last_name}
          notice={noticeDetails.notice}
          description={noticeDetails.description}
          date={noticeDetails.date}
        />
      )}
    </>
  );
};
export default Notices;
