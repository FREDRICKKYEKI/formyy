import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setSelectedFormElement } from "../../../state-management/store";
import { formElement } from "../../../types";

interface FormElementsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const FormElements: FC<FormElementsProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const handleClick = (formElement: formElement) => {
    dispatch(setSelectedFormElement(formElement));
    setIsOpen(!isOpen);
  };

  return (
    <aside className="col-lg-3 col-sm-12 p-2">
      <h3>Form Elements</h3>
      <ul className="form-elements">
        <li onClick={() => handleClick("input")}>+ Input</li>
        <li onClick={() => handleClick("textarea")}>+ Textarea</li>
        <li onClick={() => handleClick("option")}>+ Option</li>
        <li onClick={() => handleClick("checkbox")}>+ Checkbox</li>
      </ul>
      <StyleSheet />
    </aside>
  );
};

export default FormElements;

const StyleSheet = () => {
  return (
    <style>
      {`
        .form-elements li {
            margin-top: 10px;
            list-style: none;
            border: 1px solid #ccc;
            border-bottom: 4px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
            padding: 10px 20px;
        }

        .form-elements li:hover {
          background-color: white;
        }

        .form-elements li:active {
            border-bottom: 1px solid #ccc;
        }
      `}
    </style>
  );
};
/**
 * <input>
 * <select>
 * <textarea>
 * <button>
 * <fieldset>
 * <legend>
 * <datalist>
 * <output>
 * <option>
 * <optgroup>
 */

/**
 * <ul>
            <li>text</li>
            <li>password</li>
            <li>submit</li>
            <li>reset</li>
            <li>radio</li>
            <li>checkbox</li>
            <li>file</li>
          </ul>
 */
