import DateTime from "../DateTime";
import UserName from "../Username";
import Comments from "../Comments";
import EditDelete from "../EditDelete";
import FormField from "../Form/FormField";
import formData from "../Form/NoticeFormData";
import Dialog from "../Dialog";
import NoticeService from "../../services/notices";
import DeleteRecord from "../Form/DeleteRecord";
import Loader from "../Loader";
import styles from "../../styles/noticeDetails.module.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const NoticeDetails = ({ notices, setNotices }) => {
  const [isEditDeleteVisible, setIsEditDeleteVisible] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [noticeDetails, setNoticeDetails] = useState("");
  const [formValues, setFormValues] = useState({
    noticeTitle: noticeDetails !== "" ? noticeDetails.notice : "",
    noticeDescription: noticeDetails !== "" ? noticeDetails.description : "",
  });

  const noticeUrlId = useParams();

  const handleEditNotice = () => {
    // toggle EditDelete component
    setIsEditDeleteVisible(!isEditDeleteVisible);
  };

  const handleEditBtn = (e) => {
    setIsEditForm(true);
    setIsEditDeleteVisible(false);
    // after reset the from field it become empty
    // if the user wanted to edit again
    setFormValues({
      noticeTitle: noticeDetails !== "" ? noticeDetails.notice : "",
      noticeDescription: noticeDetails !== "" ? noticeDetails.description : "",
    });
  };

  const handleDeleteBtn = () => {
    // hide edit delete notice section
    setIsEditDeleteVisible(false);

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
    // notice id => got from the url /notice/4
    const { id } = noticeUrlId;

    // send form data to server
    async function sendNotice() {
      try {
        const newNotice = await NoticeService.updateNotice(
          id,
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
  };

  // close delete notice dialog
  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const handleDeleteNotice = () => {
    // notice id => got from the url /notice/4
    const { id } = noticeUrlId;
    async function deleteNotice() {
      try {
        const deletedNotice = await NoticeService.deleteNotice(id);
        const deleteNoticeId = deletedNotice[0].id;

        const remainNotices = notices.filter(
          (notice) => !(notice.id === deleteNoticeId)
        );
        setIsOpenDialog(false);

        setNotices(remainNotices);
      } catch (error) {
        console.error(error);
      }
    }
    deleteNotice();
  };

  useEffect(() => {
    // notice id => got from the url /notice/4
    const { id } = noticeUrlId;

    async function getNoticeData() {
      try {
        const noticeData = await NoticeService.getSingleNotice(id);
        setTimeout(() => {
          setNoticeDetails(noticeData);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    getNoticeData();
  }, []);

  return (
    <div className={styles.noticeDetailsContainer}>
      {Boolean(noticeDetails) > 0 ? (
        <div className={styles.allNoticeSections}>
          <h1>
            <Link to="/">Notice Board </Link>
          </h1>

          {/* A popup window let you to choose whether or not you want to edit or delete a notice */}
          <Dialog
            isOpen={isOpenDialog}
            name="deleteDialog"
            onClose={handleClose}
          >
            <DeleteRecord
              onDelete={handleDeleteNotice}
              onCancel={handleClose}
            />
          </Dialog>

          {isEditForm ? (
            <div className={styles.editNoticeContainer}>
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
            <section
              className={styles.noticeDetails}
              data-noticeid={noticeUrlId.id}
            >
              <header>
                <div className={styles.titleIconContainer}>
                  <h2 className={styles.noticeTitle}>{noticeDetails.notice}</h2>
                  <div className={styles.editDeleteNoticeContainer}>
                    <span
                      onClick={handleEditNotice}
                      className="material-symbols-outlined"
                    >
                      more_horiz
                    </span>
                    <div className={styles.editDeleteCommentContainer}>
                      {isEditDeleteVisible && (
                        <EditDelete
                          handleEditBtn={handleEditBtn}
                          handleDeleteBtn={handleDeleteBtn}
                        />
                      )}
                    </div>
                  </div>

                  <div className={styles.noticeTitleIcon}>
                    <span
                      className={`material-symbols-outlined ${styles.noticeTitleIconImg}`}
                    >
                      campaign
                    </span>
                  </div>
                </div>
                <div className={styles.nameDateContainer}>
                  <UserName
                    name={
                      noticeDetails.first_name + " " + noticeDetails.last_name
                    }
                  />
                  <DateTime
                    showIcon={true}
                    date={noticeDetails.date}
                    time={false}
                  />
                </div>
              </header>
              <div className={styles.horizontalLine}></div>
              <main>
                <h3>Notice Details</h3>
                <p className={styles.noticeDescriptions}>
                  {noticeDetails.description}
                </p>
              </main>
            </section>
          )}
          <section className={styles.commentsContainer}>
            <Comments noticeId={noticeUrlId.id} />
          </section>
        </div>
      ) : (
        <div className={styles.loaderScreen}>
          <Loader />
        </div>
      )}
    </div>
  );
};
export default NoticeDetails;
