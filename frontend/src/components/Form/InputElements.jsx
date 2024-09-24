import { useId } from "react";
import styles from "../../styles/Form/inputelement.module.css";

const InputElements = ({
  labelText,
  type,
  placeHolder,
  name,
  isRequired,
  value,
  onChangeValue,
  rows,
  cols,
}) => {
  const inputId = useId();
  const fieldId = `${inputId}-${name}`;

  return (
    <div className={styles.inputElementContainer}>
      <label htmlFor={fieldId}>
        {isRequired ? `${labelText} (required)` : { labelText }}
      </label>
      {type === "textarea" ? (
        <textarea
          className={styles.textAreaField}
          id={fieldId}
          name={name}
          rows={rows}
          cols={cols}
          value={value}
          onChange={onChangeValue}
          required={isRequired}
        ></textarea>
      ) : (
        <input
          id={fieldId}
          type={type}
          placeholder={placeHolder}
          name={name}
          value={value}
          onChange={onChangeValue}
          required={isRequired}
        />
      )}
    </div>
  );
};
export default InputElements;
