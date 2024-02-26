import { FC } from "react";
import { FormInput } from "../../../../../DataModels";
import { InputProps, MainFormElementModalProps } from "../../../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state-management/store";
import { FormGroup } from "../../../../../components/FormGroup";

export const InputModalContents: FC<MainFormElementModalProps> = (props) => {
  const formElements = useSelector((state: RootState) => state.formElements);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data: InputProps = JSON.parse(JSON.stringify(FormInput));
    const formData = new FormData(e.currentTarget);
    const inputType = formData.get("inputType") as string;
    const inputLabel = formData.get("inputLabel") as string;
    const inputPlaceholder = formData.get("inputPlaceholder") as string;
    const required = formData.get("required") as string;
    const id = crypto.randomUUID();

    Object.assign(data, {
      id: id,
      type: inputType,
      label: inputLabel,
      required: required,
      placeholder: inputPlaceholder,
    });

    props.handleFormElementsUpdate([...formElements, data]);
    props.onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <h3>Configure Input Details:</h3>
      <FormGroup>
        <label htmlFor="inputType" className="form-label">
          Input Type:
        </label>
        <select
          id="inputType"
          className="form-select"
          required
          name="inputType"
        >
          <option value="text" defaultChecked>
            Text
          </option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
        </select>
      </FormGroup>

      <FormGroup>
        {/* required? */}
        <label htmlFor="required" className="form-label">
          Required:
        </label>
        <select id="required" className="form-select" required name="required">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </FormGroup>

      <FormGroup>
        <label htmlFor="inputLabel" className="form-label">
          Label:
        </label>
        <input
          type="text"
          id="inputLabel"
          name="inputLabel"
          className="form-control"
          placeholder="Enter Label for the form input..."
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
          placeholder="Enter Placeholder for the form input..."
        />
      </FormGroup>

      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};
