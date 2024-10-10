import { useEffect, useRef, useState } from "react";
import Notice from "./Notice";
import NoticesService from "../../services/notices";
import ToggleElement from "../ToggleElement";
import FormField from "../Form/FormField";
import Loader from "../Loader";
import Filter from "../Filter";
import NoticeFormData from "../Form/NoticeFormData";
import HelperFunction from "../../Utils/HelperFuntions";
import styles from "../../styles/AllNotice/notices.module.css";
import { NavLink } from "react-router-dom";

const Notices = ({ notices, setNotices }) => {
  const [formValues, setFormValues] = useState({
    noticeTitle: "",
    noticeDescription: "",
  });
  const [filterData, setFilterData] = useState({
    month: HelperFunction.currentMonth,
    year: HelperFunction.currentYear,
  });
  const toggleElementBtn = useRef(null);

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

  console.log("filterNoticeData:", filterNoticeData(notices));

  useEffect(() => {
    const getNotices = async () => {
      try {
        const data = await NoticesService.getAll();
        setTimeout(() => {
          setNotices([...data]);
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
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to={`/`}
        >
          Notice board
        </NavLink>
      </h1>

      {/*Show loading screen untill notice data return from server */}
      {filterNoticeData(notices).length > 0 ? (
        <div className={styles.allNotices}>
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

          <div className={styles.allNotices}>
            {Boolean(filterNoticeData(notices).length > 0)
              ? filterNoticeData(notices).map((notice) => (
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
              : null}
          </div>
        </div>
      ) : (
        <div className={styles.loaderScreen}>
          <Loader />
        </div>
      )}
    </div>
  );
};
export default Notices;
