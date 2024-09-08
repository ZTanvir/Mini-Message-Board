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
  textAreaText,
}) => {
  const inputId = useId;
  const fieldId = `${inputId}-${name}`;

  return (
    <div>
      <label htmlFor={fieldId}>{labelText}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChangeValue}
          id={fieldId}
          name={name}
          rows={rows}
          cols={cols}
          required={isRequired}
        >
          {textAreaText}
        </textarea>
      ) : (
        <input
          type={type}
          placeholder={placeHolder}
          name={name}
          value={value}
          onChangeValue={onChangeValue}
          required={isRequired}
        />
      )}
    </div>
  );
};
export default InputElements;
