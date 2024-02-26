import { FC } from "react";
import { TextAreaProps } from "../../../../types";
import { FormGroup } from "../../../../components/FormGroup";

export const TextArea: FC<TextAreaProps> = (props) => {
  return (
    <FormGroup>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea className="w-100 form-control" {...props} />
    </FormGroup>
  );
};
