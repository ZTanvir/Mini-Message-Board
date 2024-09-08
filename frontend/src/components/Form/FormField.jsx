import { useId } from "react";
import InputElements from "./InputElements";

const FormField = ({ handleForm, formName, formData }) => {
  const id = useId;
  const formId = `${id}-${formName}`;
  return (
    <form onSubmit={handleForm} id={formId}>
      {formData.length > 0
        ? formData.map((data) => (
            <InputElements
              labelText={data.labelText}
              type={data.type}
              placeHolder={data.placeHolder}
              name={data.name}
              isRequired={data.isRequired}
              value={data.value}
              onChangeValue={data.onChangeValue}
              rows={data.rows}
              cols={data.cols}
              textAreaText={data.textAreaText}
            />
          ))
        : null}
    </form>
  );
};
export default FormField;
