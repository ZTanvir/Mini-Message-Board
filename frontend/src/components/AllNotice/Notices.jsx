import { useEffect, useRef, useState } from "react";
import Notice from "./Notice";
import NoticesService from "../../services/notices";
import ToggleElement from "../ToggleElement";
import FormField from "../Form/FormField";
import Loader from "../Loader";
import Filter from "../Filter";
import NoticeFormData from "../Form/NoticeFormData";
import HelperFunction from "../../Utils/HelperFunctions";
import styles from "../../styles/AllNotice/notices.module.css";
import { NavLink } from "react-router-dom";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [formValues, setFormValues] = useState({
    noticeTitle: "",
    noticeDescription: "",
  });
  const [filterData, setFilterData] = useState({
    month: HelperFunction.currentMonth,
    year: HelperFunction.currentYear,
  });
  const [toggleLoader, setToggleLoader] = useState(true);
  const toggleElementBtn = useRef(null);

  // filter notices based on filter month and year value
  const filterNoticeData = (noticeData = []) => {
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    const filterNoticeList = noticeData.filter((notice) => {
      // get month and year from notices date
      let [noticeDate, noticeTime] = notice.date.split(" ");
      let [noticeYear, noticeMonth, noticeDay] = noticeDate.split("-");
      // get filter month and year
      let [filterMonth, filterYear] = [filterData.month, filterData.year];
      // convert month name to number
      filterMonth = months[filterMonth];

      let noticeYearMonth = `${noticeYear}-${noticeMonth}`;
      let filterYearMonth = `${filterYear}-${filterMonth}`;

      // match filter monthMonthYear to noticemonthYear
      return noticeYearMonth === filterYearMonth;
    });
    return filterNoticeList;
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

  useEffect(() => {
    const getNotices = async () => {
      try {
        const data = await NoticesService.getAll();
        setTimeout(() => {
          setNotices([...data]);
          setToggleLoader(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };
    getNotices();
  }, []);

  return (
    <div className={styles.noticesContainer}>
      <h1>
        <NavLink to={`/`}>Notice board</NavLink>
      </h1>
      <Filter filterData={filterData} setFilterData={setFilterData} />
      <div className={styles.toggleSection}>
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
      </div>

      <div
        style={
          toggleLoader
            ? { gridAutoRows: "auto" }
            : { gridAutoRows: "min-content" }
        }
        className={styles.allNotices}
      >
        {/*Show/hide loading screen until notice data return from server */}
        {toggleLoader ? (
          <div className={styles.loaderScreen}>
            <Loader />
          </div>
        ) : // Display notice or no notice based on server response
        Boolean(filterNoticeData(notices).length) ? (
          filterNoticeData(notices).map((notice) => (
            <NavLink
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
        ) : (
          <h1>No notices</h1>
        )}
      </div>
    </div>
  );
};
export default Notices;
