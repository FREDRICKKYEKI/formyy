import { FC, useEffect, useState } from "react";
import { MainFormElementModal } from "./components/modal/MainFormElementModal";
import { MainFormSection } from "./sections/MainFormSection";
import { BaseFormElementProps } from "../../types";
import { useDispatch } from "react-redux";
import { setFormElements } from "../../state-management/store";
import { ElementSettings } from "./sections/ElementSettings";
import FormElements from "./sections/FormElements";
import { Header } from "../../components/Header";
import { useParams } from "react-router-dom";

const FormMaker: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [form, setForm] = useState<any>(null);

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
    setForm((window as any)?.__GLOBAL_STATE__?.form);
    handleFormElementsUpdate(
      JSON.parse((window as any)?.__GLOBAL_STATE__?.form.form_schema)
    );
  }, []);

  return (
    <div className="w-100">
      <Header />
      <div className="row d-flex p-4 w-100">
        <hr />
        <h5>
          {form?.title} - {form?.description}
        </h5>
        <hr />
        <FormElements isOpen={isOpen} setIsOpen={setIsOpen} />
        <MainFormSection />
        <ElementSettings />
      </div>
      <MainFormElementModal
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        handleFormElementsUpdate={handleFormElementsUpdate}
      />
    </div>
  );
};

export default FormMaker;
