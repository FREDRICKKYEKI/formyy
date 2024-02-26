import { useDispatch, useSelector } from "react-redux";
import { BaseFormElementProps } from "../../../types";
import { FC } from "react";
import { Input } from "../components/form-elements/Input";
import { TextArea } from "../components/form-elements/TextArea";
import {
  RootState,
  setActiveFormElement,
  setFormElements,
} from "../../../state-management/store";
import { Select } from "../components/form-elements/Select";
import { Checks } from "../components/form-elements/Checks";

const formElementMap: {
  [key: string]: (element: BaseFormElementProps) => JSX.Element;
} = {
  input: (element: any) => <Input {...element} />,
  textarea: (element: any) => <TextArea {...element} />,
  select: (element: any) => <Select {...element} />,
  "checkbox-group": (element: any) => <Checks {...element} />,
  radio: (element: any) => <input type="radio" {...element} />,
};

const FormElement = (
  element: BaseFormElementProps,
  index: number,
  handleDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void,
  dispatch: ReturnType<typeof useDispatch>
) => {
  return (
    <div
      onClick={() => {
        dispatch(setActiveFormElement(element));
      }}
      className="d-flex justify-content-between align-items-center gap-1"
    >
      {formElementMap[element.element](element)}
      <button onClick={(e) => handleDelete(e, index)} className="btn p-2">
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};

export const MainFormSection: FC = () => {
  const formElements = useSelector((state: RootState) => state.formElements);
  const dispatch = useDispatch();

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    console.log(
      `Deleting element \`${formElements[index].element}\` at index:`,
      index
    );

    const newElements = formElements.filter((_, i) => i !== index);

    dispatch(setFormElements(newElements));
  };

  return (
    <main className="col-lg-6 col-sm-12">
      <section className="form-preview">
        <form className="container px-5 w-100">
          <h3>Form Preview</h3>
          {formElements.map((element: BaseFormElementProps, index: number) => (
            <div key={element.id}>
              {FormElement(element, index, handleDelete, dispatch)}
            </div>
          ))}
        </form>
      </section>
    </main>
  );
};
