import { useId, useState, useRef } from "react";
import InputElements from "./InputElements";

const FormField = ({
  formData,
  formName,
  formValues,
  setFormValues,
  handleSubmitFrom,
}) => {
  const id = useId();
  const formId = `${id}-${formName}`;

  return (
    <form onSubmit={handleSubmitFrom} id={formId}>
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
    </form>
  );
};
export default FormField;
