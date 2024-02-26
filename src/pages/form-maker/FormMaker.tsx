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
import { serverUrl } from "../../utils";

const FormMaker: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);

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

    fetch(`${serverUrl}/forms/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data: any) => {
        setLoading(false);
        dispatch(setFormElements(JSON.parse(data.form.form_schema)));
      })
      .catch((e) => {
        setLoading(false);
        console.error("Something went wrong !", e);
      });
  });

  return (
    <div className="w-100">
      <Header />
      <div className="row d-flex p-4 w-100">
        {loading ? (
          <h4>Loading form...</h4>
        ) : (
          <>
            <FormElements isOpen={isOpen} setIsOpen={setIsOpen} />
            <MainFormSection />
            <ElementSettings />
          </>
        )}
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
