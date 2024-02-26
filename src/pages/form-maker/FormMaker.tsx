import { FC, useState } from "react";
import { MainFormElementModal } from "./components/modal/MainFormElementModal";
import { MainFormSection } from "./sections/MainFormSection";
import { BaseFormElementProps } from "../../types";
import { useDispatch } from "react-redux";
import { setFormElements } from "../../state-management/store";
import { ElementSettings } from "./sections/ElementSettings";
import FormElements from "./sections/FormElements";
import { Header } from "../../components/Header";

const FormMaker: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleFormElementsUpdate = (state: BaseFormElementProps[]) => {
    dispatch(setFormElements(state));
  };

  return (
    <div className="w-100">
      <Header />
      <div className="row d-flex p-4 w-100">
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
