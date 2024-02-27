import { useDispatch, useSelector } from "react-redux";
import { BaseFormElementProps } from "../../types";
import { RootState, setActiveFormElement } from "../../state-management/store";
import { formElementMap } from "../form-maker/sections/FormPreview";

const FormElement = (
  element: BaseFormElementProps,
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
    </div>
  );
};

const Form: React.FC = () => {
  const dispatch = useDispatch();
  let formElements = useSelector((state: RootState) => state.formElements);
  const form = useSelector((state: RootState) => state.form);
  console.log(formElements);

  if (typeof formElements === "string") {
    formElements = JSON.parse(formElements);
  }
  return (
    <section className="form-preview">
      <form className="container px-2 w-100 h-100">
        <h1 className="my-3">Formyy</h1>
        <h3>{form?.title}</h3>
        <p>{form?.description}</p>
        {formElements?.length ? (
          formElements?.map((element: BaseFormElementProps) => (
            <div key={element.id}>{FormElement(element, dispatch)}</div>
          ))
        ) : (
          <div className="d-flex flex-column align-items-center">
            <p className="text-center w-100">Loading form...</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Form;
