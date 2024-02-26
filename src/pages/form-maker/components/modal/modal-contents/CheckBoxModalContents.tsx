import { FC, useState } from "react";
import {
  CheckboxGroupProps,
  CheckboxProps,
  MainFormElementModalProps,
} from "../../../../../types";
import { FormGroup } from "../../../../../components/FormGroup";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state-management/store";
import { CheckboxGroup } from "../../../../../DataModels";

interface CheckboxModalProps extends CheckboxProps {
  checks: CheckboxProps[];
  setChecks: (check: CheckboxProps[]) => void;
}

const Checkbox: FC<CheckboxModalProps> = (props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.setChecks(
      props.checks.map((check) =>
        check.id === props.id ? { ...check, defaultValue: value } : check
      )
    );
  };

  return (
    <FormGroup>
      <label htmlFor="inputLabel" className="form-label">
        Checkbox:
      </label>
      <input
        type="text"
        id="inputLabel"
        required
        onChange={handleInputChange}
        name="inputLabel"
        className="form-control"
        placeholder="Enter name of the checkbox..."
      />
    </FormGroup>
  );
};

export const CheckboxModalContents: FC<MainFormElementModalProps> = (props) => {
  const [checks, setChecks] = useState<CheckboxProps[]>([]);
  const formElements = useSelector((state: RootState) => state.formElements);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checks.length) {
      alert("Please add atleast one checkbox");
      return;
    }

    const data: CheckboxGroupProps = JSON.parse(JSON.stringify(CheckboxGroup));
    const formData = new FormData(e.currentTarget);

    const id = crypto.randomUUID();
    const label = formData.get("inputLabel") as string;
    const required = formData.get("required") === "true";

    Object.assign(data, {
      id,
      name: id,
      label,
      required,
      checks,
    });

    props.handleFormElementsUpdate([...formElements, data]);
    props.onClose();
  };

  const handleAddChecksElement = () => {
    setChecks([
      ...checks,
      {
        id: crypto.randomUUID(),
        element: "checkbox",
        label: "Checkbox",
        checked: false,
        disabled: false,
        name: "CheckboxGroup",
        defaultValue: "",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <h3>Configure Checkboxes:</h3>

      <FormGroup>
        <label htmlFor="inputLabel" className="form-label">
          Label:
        </label>
        <input
          type="text"
          id="inputLabel"
          required
          name="inputLabel"
          className="form-control"
          placeholder="Enter Label for the form element..."
        />
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

      <div className="d-flex gap-2 align-items-center">
        <div className="line"></div>
        <strong>Add Checks</strong>
        <div className="line"></div>
      </div>

      <button onClick={handleAddChecksElement} className="mt-3">
        Add Checkbox +
      </button>

      <div className="container mt-2 b-gray">
        {checks.map((check) => (
          <Checkbox
            key={check.id}
            {...check}
            setChecks={setChecks}
            checks={checks}
          />
        ))}
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Add
      </button>
      {/* <StyleSheet /> */}
    </form>
  );
};
