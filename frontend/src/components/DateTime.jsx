import styles from "../styles/datetime.module.css";
const DateTime = ({ showIcon, date, time }) => {
  const formateDate = (dateTime = "") => {
    // "YYYY-MM-DD HH:MM:SS"
    let yearMonthDay = dateTime.split(" ")[0];
    // 04 June, 2022
    let [year, month, day] = yearMonthDay.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    month = monthNames[Number(month)];

    return `${day} ${month}, ${year}`;
  };

  const formateTime = (dateTime = "") => {
    // "YYYY-MM-DD HH:MM:SS"
    let hourMinuteSecond = dateTime.split(" ")[1];
    //  04:20 PM
    let [hour, minute, second] = hourMinuteSecond.split(":");
    let meridiem = "AM";
    if (hour > 12) {
      hour = Number(hour) - 12;
      meridiem = "PM";
    }
    return `${hour}:${minute} ${meridiem}`;
  };

  return (
    <div className={styles.dateTimeContainer}>
      {showIcon && (
        <span className="material-symbols-outlined">calendar_month</span>
      )}
      {date && <span className={styles.date}>{formateDate(date)}</span>}
      {time && <span className={styles.roundBall}></span>}
      {time && <span className={styles.time}>{formateTime(date)}</span>}
    </div>
  );
};
export default DateTime;
