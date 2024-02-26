import { FC } from "react";
import { MainFormElementModalProps, TextAreaProps } from "../../../../../types";
import { FormTextArea } from "../../../../../DataModels";
import { FormGroup } from "../../../../../components/FormGroup";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state-management/store";

export const TextAreaModalContents: FC<MainFormElementModalProps> = (props) => {
  const formElements = useSelector((state: RootState) => state.formElements);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = crypto.randomUUID();
    const data: TextAreaProps = JSON.parse(JSON.stringify(FormTextArea));

    Object.assign(data, {
      id: id,
      name: id,
      label: formData.get("inputLabel") as string,
      placeholder: formData.get("inputPlaceholder") as string,
      rows: +formData.get("rows")!,
      required: formData.get("required") === "true",
    });

    props.handleFormElementsUpdate([...formElements, data]);
    props.onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <h3>Configure Text Area Details:</h3>

      <FormGroup>
        <label htmlFor="inputLabel" className="form-label">
          Label:
        </label>
        <input
          type="text"
          id="inputLabel"
          name="inputLabel"
          className="form-control"
          placeholder="Enter Label for the form element..."
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="inputPlaceholder" className="form-label">
          Placeholder:
        </label>
        <input
          type="text"
          id="inputPlaceholder"
          name="inputPlaceholder"
          className="form-control"
          placeholder="Enter placeholder for the form input..."
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="rows" className="form-label">
          Height:
        </label>
        <select id="rows" className="form-select" required name="rows">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup>
        <label htmlFor="required" className="form-label">
          Required:
        </label>
        <select id="required" className="form-select" required name="required">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </FormGroup>

      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};
