import styles from "../styles/editDelete.module.css";
const EditDelete = ({ handleEditBtn, handleDeleteBtn }) => {
  return (
    <div className={styles.editDeleteContainer}>
      <div className={styles.boxArrow}></div>
      <button
        data-btn="editBtn"
        className={styles.editBtn}
        onClick={handleEditBtn}
      >
        <span className="material-symbols-outlined">edit</span> Edit
      </button>
      <button
        data-btn="deleteBtn"
        className={styles.deleteBtn}
        onClick={handleDeleteBtn}
      >
        <span className="material-symbols-outlined">delete</span> Delete
      </button>
    </div>
  );
};
export default EditDelete;
