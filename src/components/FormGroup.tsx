import { FC, ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export const FormGroup: FC<FormGroupProps> = (props) => {
  return (
    <div
      className={`form-group mb-3 flex-1 w-100${
        props?.className ? props?.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};
