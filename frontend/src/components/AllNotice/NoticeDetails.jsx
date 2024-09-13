import DateTime from "../DateTime";
import UserName from "../Username";
import Comments from "../Comments";
import EditDelete from "../EditDelete";
import FormField from "../Form/FormField";
import formData from "../Form/NoticeFormData";
import styles from "../../styles/noticeDetails.module.css";
import { useState } from "react";

const NoticeDetails = ({
  id,
  first_name,
  last_name,
  notice,
  description,
  date,
  notices,
  setNotices,
}) => {
  const [isEditDeleteVisiable, setIsEditDeleteVisiable] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [formValues, setFormValues] = useState({
    noticeTitle: notice,
    noticeDescription: description,
  });
  const fullName = first_name + " " + last_name;
  const noticeId = id;

  const handleEditNotice = () => {
    // toggle EditDelete component
    setIsEditDeleteVisiable(!isEditDeleteVisiable);
  };

  const handleEditBtn = (e) => {
    setIsEditForm(true);
    setIsEditDeleteVisiable(false);
  };
  const handleDeleteBtn = () => {
    console.log("Delete btn");
  };
  const handleSubmitForm = () => {};

  return (
    <div className={styles.noticeDetailsContainer}>
      {isEditForm ? (
        <FormField
          formData={formData}
          formName="updateNotice"
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmitFrom={handleSubmitForm}
        />
      ) : (
        <section data-noticeid={id}>
          <header>
            <div className={styles.titleIconContainer}>
              <h2 className={styles.noticeTitle}>
                {notice}
                <span
                  onClick={handleEditNotice}
                  className="material-symbols-outlined"
                >
                  more_horiz
                </span>
              </h2>
              {isEditDeleteVisiable && (
                <EditDelete
                  handleEditBtn={handleEditBtn}
                  handleDeleteBtn={handleDeleteBtn}
                />
              )}
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
      )}

      <section>
        <Comments noticeId={noticeId} />
      </section>
    </div>
  );
};
export default NoticeDetails;
