import DateTime from "../DateTime";
import Usename from "../Username";
import styles from "../../styles/AllNotice/notice.module.css";

const Notice = ({ id, title, firstName, lastName, date, handleNotice }) => {
  const fullName = firstName + " " + lastName;
  return (
    <section
      className={styles.noticeContainer}
      onClick={handleNotice}
      data-noticeid={id}
    >
      <h2>{title}</h2>
      <div className={styles.dateUserContainer}>
        <Usename name={fullName} />
        <DateTime showIcon={true} date={date} time={false} />
      </div>
    </section>
  );
};
export default Notice;
