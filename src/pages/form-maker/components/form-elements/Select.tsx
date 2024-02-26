import { FC } from "react";
import { FormGroup } from "../../../../components/FormGroup";
import { OptionProps, SelectOptionProps } from "../../../../types";

export const Select: FC<SelectOptionProps> = ({ options, ...props }) => {
  return (
    <FormGroup>
      <label htmlFor={props.id}>{props.label}</label>
      <select className="w-100 form-select" {...props}>
        {options.map((option: OptionProps) => {
          return (
            <option key={option.defaultValue} value={option.defaultValue}>
              {option.defaultValue}
            </option>
          );
        })}
      </select>
    </FormGroup>
  );
};
