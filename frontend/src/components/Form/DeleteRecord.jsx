import styles from "../../styles/deleterecord.module.css";
import confirmDeleteImg from "../../assets/images/confirmDelete.png";

const DeleteRecord = ({ onDelete, onCancel }) => {
  return (
    <div className={styles.deleteRecordContainer}>
      <span onClick={onCancel} title="Close" className={styles.crossIcon}>
        X
      </span>
      <img
        className={styles.deleteIcon}
        src={confirmDeleteImg}
        alt="A cross inside a red circle"
      />
      <p>
        Do you really want to delete this record? This process canot be undone
      </p>
      <div className={styles.buttons}>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.deleteBtn} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteRecord;
