import { FC, useState } from "react";
import {
  MainFormElementModalProps,
  OptionProps,
  SelectOptionProps,
} from "../../../../../types";
import { FormGroup } from "../../../../../components/FormGroup";
import { FormOption } from "../../../../../DataModels";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state-management/store";

interface OptionModalProps extends OptionProps {
  options: OptionProps[];
  setOptions: (option: OptionProps[]) => void;
}

const OptionName: FC<OptionModalProps> = (props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.setOptions(
      props.options.map((option) =>
        option.id === props.id ? { ...option, defaultValue: value } : option
      )
    );
  };

  return (
    <FormGroup>
      <label htmlFor="inputLabel" className="form-label">
        Option:
      </label>
      <input
        type="text"
        id="inputLabel"
        required
        onChange={handleInputChange}
        name="inputLabel"
        className="form-control"
        placeholder="Enter name of the option..."
      />
    </FormGroup>
  );
};

export const OptionModalContents: FC<MainFormElementModalProps> = (props) => {
  const [options, setOptions] = useState<OptionProps[]>([]);
  const formElements = useSelector((state: RootState) => state.formElements);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!options.length) {
      alert("Please add atleast one option");
      return;
    }

    const data: SelectOptionProps = JSON.parse(JSON.stringify(FormOption));
    const formData = new FormData(e.currentTarget);

    const id = crypto.randomUUID();
    const label = formData.get("inputLabel") as string;
    const required = formData.get("required") === "true";

    Object.assign(data, {
      id,
      name: id,
      label,
      required,
      options,
    });
    props.handleFormElementsUpdate([...formElements, data]);
    props.onClose();
  };

  const handleAddOptionElement = () => {
    setOptions([
      ...options,
      {
        id: crypto.randomUUID(),
        element: "option",
        defaultValue: "",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <h3>Configure Form Options:</h3>

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
        {/* required? */}
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
        <strong>Add options</strong>
        <div className="line"></div>
      </div>

      <button onClick={handleAddOptionElement} className="mt-3">
        Add option +
      </button>
      <div className="container mt-2 b-gray">
        {options.map((option) => (
          <OptionName
            key={option.id}
            {...option}
            setOptions={setOptions}
            options={options}
          />
        ))}
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Add
      </button>
      <StyleSheet />
    </form>
  );
};

const StyleSheet = () => {
  return (
    <style>
      {`
    `}
    </style>
  );
};
