import DateTime from "../DateTime";
import UserName from "../Username";
import Comments from "../Comments";
import styles from "../../styles/noticeDetails.module.css";

const NoticeDetails = ({
  id,
  first_name,
  last_name,
  notice,
  description,
  date,
}) => {
  const fullName = first_name + " " + last_name;
  const noticeId = id;

  return (
    <div className={styles.noticeDetailsContainer}>
      <section data-noticeid={id}>
        <header>
          <div className={styles.titleIconContainer}>
            <h2 className={styles.noticeTitle}>{notice}</h2>
            <div className={styles.noticeTitleIcon}>
              <span className="material-symbols-outlined">campaign</span>
            </div>
          </div>
          <div className={styles.nameDateContainer}>
            <UserName name={fullName} />
            <DateTime showIcon={true} date={date} time={false} />
          </div>
        </header>
        <div className={styles.horizontalLine}></div>
        <main>
          <h3>Notice Details</h3>
          <p>{description}</p>
        </main>
      </section>
      <section>
        <Comments noticeId={noticeId} />
      </section>
    </div>
  );
};
export default NoticeDetails;
