import { useId } from "react";

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
    <div>
      <label htmlFor={fieldId}>{labelText}</label>
      {type === "textarea" ? (
        <textarea
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
