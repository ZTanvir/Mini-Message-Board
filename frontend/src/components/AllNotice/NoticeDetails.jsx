import DateTime from "../DateTime";
import UserName from "../Username";
import Comments from "../Comments";
import EditDelete from "../EditDelete";
import FormField from "../Form/FormField";
import formData from "../Form/NoticeFormData";
import Dialog from "../Dialog";
import NoticeService from "../../services/notices";
import DeleteRecord from "../Form/DeleteRecord";
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
  const [isOpenDialog, setIsOpenDialog] = useState(false);
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
    // after reset the from field it become empty
    // if the user wanted to edit again
    setFormValues({ noticeTitle: notice, noticeDescription: description });
  };

  const handleDeleteBtn = () => {
    // hide edit delete notice section
    setIsEditDeleteVisiable(false);

    setIsOpenDialog(true);
  };

  const handleCloseBtn = () => {
    setIsEditForm(false);
  };
  const handleResetFrom = () => {
    setFormValues({ noticeTitle: "", noticeDescription: "" });
  };

  // Add notice
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // send form data to server
    async function sendNotice() {
      try {
        const newNotice = await NoticeService.updateNotice(
          noticeId,
          1,
          formValues.noticeTitle,
          formValues.noticeDescription
        );
        // remove old notice
        const allNotices = notices.filter(
          (notice) => !(notice.id === newNotice[0].id)
        );
        // add updated notice
        setNotices([...allNotices, ...newNotice]);
        // hide add notice form
        setIsEditForm(false);
      } catch (error) {
        console.error(error);
      }
    }
    sendNotice();

    // update the ui with latest updated data
    console.log(formValues);
  };

  // close delete notice dialog
  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const handleDeleteNotice = () => {
    console.log("Delete Notice");
    async function deleteNotice() {
      try {
        const deletedNotice = await NoticeService.deleteNotice(noticeId);
        const deleteNoticeId = deletedNotice[0].id;
        const remainNotices = notices.filter(
          (notice) => !notice.id === deleteNoticeId
        );
        setNotices(remainNotices);
      } catch (error) {
        console.error(error);
      }
    }
    deleteNotice();
  };

  return (
    <div className={styles.noticeDetailsContainer}>
      <Dialog isOpen={isOpenDialog} name="deleteDialog" onClose={handleClose}>
        <DeleteRecord onDelete={handleDeleteNotice} onCancel={handleClose} />
      </Dialog>
      {isEditForm ? (
        <div>
          <button onClick={handleCloseBtn}>Close</button>
          <FormField
            formData={formData}
            formName="updateNotice"
            formValues={formValues}
            isResetForm={true}
            handleResetBtn={handleResetFrom}
            setFormValues={setFormValues}
            handleSubmitFrom={handleSubmitForm}
          />
        </div>
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
