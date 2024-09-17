import { useEffect, useState } from "react";
import Notice from "./Notice";
import NoticeDetails from "./NoticeDetails";
import NoticesService from "../../services/notices";
import ToggleElement from "../ToggleElement";
import FormField from "../Form/FormField";
import NoticeFormData from "../Form/NoticeFormData";
import Dialog from "../Dialog";

const Notices = ({}) => {
  const [notices, setNotices] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [noticeDetails, setNoticeDetails] = useState("");
  const [formValues, setFormValues] = useState({
    noticeTitle: "",
    noticeDescription: "",
  });

  const handleNotice = (e) => {
    const noticeId = Number(e.currentTarget.dataset.noticeid);
    const getNoticeDetails = notices.filter((notice) => notice.id === noticeId);
    const noticeData = getNoticeDetails.length > 0 ? getNoticeDetails[0] : "";
    setNoticeDetails(noticeData);
  };

  const handleAddNewNotice = (e) => {
    e.preventDefault();
    async function addNewNotice() {
      const { noticeTitle, noticeDescription } = formValues;
      try {
        const newNoticeData = await NoticesService.addNotice(
          1,
          noticeTitle,
          noticeDescription
        );
        setNotices([...notices, newNoticeData[0]]);
      } catch (error) {
        console.error(error);
      }
    }
    addNewNotice();
    // reset add notice form
    setFormValues({ noticeTitle: "", noticeDescription: "" });
  };

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
          formData={NoticeFormData}
          formName={"addNotice"}
          formValues={formValues}
          isResetForm={false}
          setFormValues={setFormValues}
          handleSubmitFrom={handleAddNewNotice}
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
          notices={notices}
          setNotices={setNotices}
        />
      )}
    </>
  );
};
export default Notices;
