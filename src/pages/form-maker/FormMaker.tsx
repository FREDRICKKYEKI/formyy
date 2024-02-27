import { FC, useEffect, useState } from "react";
import { MainFormElementModal } from "./components/modal/MainFormElementModal";
import { MainFormSection } from "./sections/MainFormSection";
import { BaseFormElementProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setFormElements } from "../../state-management/store";
import { ElementSettings } from "./sections/ElementSettings";
import FormElements from "./sections/FormElements";
import { Header } from "../../components/Header";
import { useParams } from "react-router-dom";

const FormMaker: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const params = useParams();
  const form = useSelector((state: RootState) => state.form);

  const handleFormElementsUpdate = (state: BaseFormElementProps[]) => {
    dispatch(setFormElements(state));
  };

  useEffect(() => {
    if (!params.id) {
      alert(
        "Invalid form id. Please provide a valid form id. Redirecting to home page"
      );
      window.location.href = "/";
    }
    handleFormElementsUpdate(
      JSON.parse((window as any)?.__GLOBAL_STATE__?.form.form_schema)
    );
  }, []);

  return (
    <div className="w-100">
      <Header />
      <div className="row d-flex p-4 w-100">
        <div className="d-flex justify-content-between align-items-center bottom-header py-2">
          <h5>
            {form?.title} - {form?.description}
          </h5>
          <div className="d-flex gap-3 align-items-center">
            <a
              href={`http://localhost:5173/forms/statusChange?id=${
                params.id
              }&state=${form?.form_state === "active" ? "inactive" : "active"}`}
              className="text-decoration-none btn"
            >
              {form?.form_state === "active" ? (
                <b className="text-danger">Deactivate</b>
              ) : (
                <b className="text-success">Activate</b>
              )}
            </a>
            <a
              href={`/form/${form?.id}/submissions`}
              target="_blank"
              className=""
            >
              View Submissions
            </a>
          </div>
        </div>
        <FormElements isOpen={isOpen} setIsOpen={setIsOpen} />
        <MainFormSection />
        <ElementSettings />
      </div>
      <MainFormElementModal
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        handleFormElementsUpdate={handleFormElementsUpdate}
      />
      <StyleSheet />
    </div>
  );
};

export default FormMaker;

const StyleSheet = () => {
  return (
    <style>
      {`
      .bottom-header {
        border: 1px solid #e0e0e0;
      }
      `}
    </style>
  );
};
