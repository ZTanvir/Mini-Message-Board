import Dropdown from "./Dropdown";
import styles from "../styles/filter.module.css";

const Filter = ({}) => {
  const dropDownNames = [
    { id: crypto.randomUUID(), name: "January" },
    { id: crypto.randomUUID(), name: "February" },
    { id: crypto.randomUUID(), name: "March" },
    { id: crypto.randomUUID(), name: "April" },
    { id: crypto.randomUUID(), name: "May" },
    { id: crypto.randomUUID(), name: "June" },
    { id: crypto.randomUUID(), name: "July" },
    { id: crypto.randomUUID(), name: "August" },
    { id: crypto.randomUUID(), name: "September" },
    { id: crypto.randomUUID(), name: "October" },
    { id: crypto.randomUUID(), name: "November" },
    { id: crypto.randomUUID(), name: "December" },
  ];
  const currentYear = new Date().getFullYear();

  // contains random id and last 5 years from today
  const dropDownYears = () => {
    let years = [];
    for (let index = 0; index < 5; index++) {
      const id = crypto.randomUUID();
      const name = currentYear - index;
      years.push({ id, name });
    }
    return years;
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.leftItems}>
        <span>Filter</span>
        <span className="material-symbols-outlined">filter_alt</span>
      </div>
      <div className={styles.rightItems}>
        <Dropdown text={"January"} values={dropDownNames} />
        <Dropdown text={currentYear} values={dropDownYears()} />
      </div>
    </div>
  );
};
export default Filter;
