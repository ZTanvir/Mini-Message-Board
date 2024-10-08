import { useState } from "react";
import styles from "../styles/dropdown.module.css";
const Dropdown = ({ text, values }) => {
  const [isValuesShown, setIsValuesShown] = useState(false);

  const handleDropdownBtn = () => {
    setIsValuesShown(!isValuesShown);
  };
  const handleDropDownItems = (e) => {
    setIsValuesShown(!isValuesShown);
    console.log(e.currentTarget.innerText);
  };

  return (
    <div className={styles.dropdownMenu}>
      <button onClick={handleDropdownBtn} className={styles.dropdownBtn}>
        <span>{text}</span>
        <span className="material-symbols-outlined">
          {isValuesShown ? "keyboard_arrow_down" : "keyboard_arrow_up"}
        </span>
      </button>
      <ul className={styles.dropdownItems}>
        {values.length > 0 && isValuesShown
          ? values.map((value) => (
              <li
                onClick={handleDropDownItems}
                className={styles.dropdownItem}
                key={value.id}
              >
                {value.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
export default Dropdown;
