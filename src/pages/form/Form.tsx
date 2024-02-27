import { useDispatch, useSelector } from "react-redux";
import { BaseFormElementProps } from "../../types";
import { RootState, setActiveFormElement } from "../../state-management/store";
import { formElementMap } from "../form-maker/sections/FormPreview";
import { Suspense } from "react";

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
  const isClient = useSelector((state: RootState) => state.isClient);

  if (typeof formElements === "string") {
    formElements = JSON.parse(formElements);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submission: any = {};
    const tmpElements = JSON.parse(JSON.stringify(formElements));

    Object.assign(submission, {
      form_id: form.id,
      submission_data: [],
    });

    for (let element of tmpElements) {
      const data = {};
      Object.assign(data, {
        element_id: element.id,
        label: element.label,
        placeholder: element.placeholder,
        value: formData.get(element.id),
      });

      submission.submission_data.push(data);
    }
    // Convert submission data to a JSON string and URL encode it
    const submissionDataString = encodeURIComponent(
      JSON.stringify(submission.submission_data)
    );

    // Construct the query parameters string
    const queryParams = new URLSearchParams({
      form_id: form.id,
      submission_data: submissionDataString,
    }).toString();

    e.currentTarget.action = `http://localhost:5173/forms/submissions?${queryParams}`;
    e.currentTarget.submit();
    console.log(submission);
  };
  return (
    <section className="form-preview">
      {isClient && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <form
            method="POST"
            onSubmit={handleFormSubmit}
            className="container px-2 w-100 h-100"
          >
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Suspense>
      )}
    </section>
  );
};

export default Form;
