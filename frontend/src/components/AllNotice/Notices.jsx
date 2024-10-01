import { useEffect, useRef, useState } from "react";
import Notice from "./Notice";
import NoticeDetails from "./NoticeDetails";
import NoticesService from "../../services/notices";
import ToggleElement from "../ToggleElement";
import FormField from "../Form/FormField";
import NoticeFormData from "../Form/NoticeFormData";
import styles from "../../styles/AllNotice/notices.module.css";
import { NavLink } from "react-router-dom";

const Notices = ({ notices, setNotices, setNoticeDetails }) => {
  const [formValues, setFormValues] = useState({
    noticeTitle: "",
    noticeDescription: "",
  });
  const toggleElementBtn = useRef(null);

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
        // click the add notice or close form button inside ToggleElement component
        toggleElementBtn.current.click();
        setNotices([...notices, newNoticeData[0]]);
      } catch (error) {
        console.error(error);
      }
    }
    addNewNotice();
    // reset add notice form
    setFormValues({ noticeTitle: "", noticeDescription: "" });
  };
  const handleNoticeDetails = (e) => {
    const noticeId = Number(e.currentTarget.dataset.id);
    const noticeData = notices.filter(
      (notice) => Number(noticeId) === notice.id
    );
    const noticeDataObj = { ...noticeData[0] };
    setNoticeDetails(noticeDataObj);
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
    <div className={styles.noticesContainer}>
      <h1>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to={`/`}
        >
          Notice board{" "}
        </NavLink>
      </h1>
      <ToggleElement ref={toggleElementBtn} btnText={"Add Notice"}>
        <FormField
          formData={NoticeFormData}
          formName={"addNotice"}
          formValues={formValues}
          isResetForm={false}
          setFormValues={setFormValues}
          handleSubmitFrom={handleAddNewNotice}
        />
      </ToggleElement>
      <div className={styles.allNotices}>
        {Boolean(notices.length > 0)
          ? notices.map((notice) => (
              <NavLink
                onClick={handleNoticeDetails}
                key={notice.id}
                data-id={notice.id}
                to={`notice/${notice.id}`}
              >
                <Notice
                  id={notice.id}
                  title={notice.notice}
                  firstName={notice.first_name}
                  lastName={notice.last_name}
                  date={notice.date}
                />
              </NavLink>
            ))
          : null}
      </div>
    </div>
  );
};
export default Notices;
