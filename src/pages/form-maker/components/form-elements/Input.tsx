import { FC } from "react";
import { InputProps } from "../../../../types";
import { FormGroup } from "../../../../components/FormGroup";

export const Input: FC<InputProps> = ({ name, id, ...props }) => {
  return (
    <FormGroup>
      <label htmlFor={id}>{props.label}</label>
      <input name={id} className="w-100 form-control" {...props} />
    </FormGroup>
  );
};
