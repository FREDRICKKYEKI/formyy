import { FC } from "react";
import { InputProps } from "../../../../types";
import { FormGroup } from "../../../../components/FormGroup";

export const Input: FC<InputProps> = (props) => {
  return (
    <FormGroup>
      <label htmlFor={props.id}>{props.label}</label>
      <input className="w-100 form-control" {...props} />
    </FormGroup>
  );
};
