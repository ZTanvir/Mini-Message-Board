import { useId, useState, useRef } from "react";
import InputElements from "./InputElements";

const FormField = ({
  formData,
  formName,
  formValues,
  isResetForm,
  handleResetBtn,
  setFormValues,
  handleSubmitFrom,
}) => {
  const id = useId();
  const formId = `${id}-${formName}`;
  const formEl = useRef();

  return (
    <form ref={formEl} onSubmit={handleSubmitFrom} id={formId}>
      {formData.length > 0
        ? formData.map((data) => (
            <InputElements
              key={data.id}
              labelText={data.labelText}
              type={data.type}
              placeHolder={data.placeHolder}
              name={data.name}
              isRequired={data.isRequired}
              value={formValues[data.name]}
              onChangeValue={(event) => {
                setFormValues({
                  ...formValues,
                  [event.target.name]: event.target.value,
                });
              }}
              rows={data.rows}
              cols={data.cols}
              textAreaText={data.textAreaText}
            />
          ))
        : null}
      <button type="submit">Add Notice</button>
      {isResetForm && (
        <button onClick={handleResetBtn} type="reset">
          Reset
        </button>
      )}
    </form>
  );
};
export default FormField;
