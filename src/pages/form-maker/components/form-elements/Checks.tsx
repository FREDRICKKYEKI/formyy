import { FC } from "react";
import { FormGroup } from "../../../../components/FormGroup";
import { CheckboxGroupProps } from "../../../../types";

export const Checks: FC<CheckboxGroupProps> = ({ checks, ...props }) => {
  return (
    <FormGroup>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      {checks.map((check) => (
        <div key={check.id} className="form-check">
          <label htmlFor={check.id} className="form-check-label">
            {check.defaultValue}
          </label>
          <input
            type="checkbox"
            id={check.id}
            name={check.name}
            value={check.defaultValue}
            className="form-check-input"
          />
        </div>
      ))}
    </FormGroup>
  );
};
