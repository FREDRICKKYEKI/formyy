import { useDispatch } from "react-redux";
import {
  setActiveFormElement,
  setFormElements,
} from "../../../state-management/store";
import { BaseFormElementProps } from "../../../types";
import { Checks } from "../components/form-elements/Checks";
import { Input } from "../components/form-elements/Input";
import { Select } from "../components/form-elements/Select";
import { TextArea } from "../components/form-elements/TextArea";

interface FormPreviewProps {
  formElements: BaseFormElementProps[];
}

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

const FormPreview: React.FC<FormPreviewProps> = ({ formElements }) => {
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
    <section className="form-preview">
      <form className="container px-2 w-100 h-100">
        {formElements &&
          formElements?.map((element: BaseFormElementProps, index: number) => (
            <div key={element.id}>
              {FormElement(element, index, handleDelete, dispatch)}
            </div>
          ))}
      </form>
    </section>
  );
};

export default FormPreview;
