import { useSelector } from "react-redux";
import { FC, Suspense, lazy, useEffect, useState } from "react";
import { RootState } from "../../../state-management/store";

const FormPreview = lazy(() => import("./FormPreview"));

export const MainFormSection: FC = () => {
  let formElements = useSelector((state: RootState) => state.formElements);
  const [isClient, setIsClient] = useState(false);
  if (typeof formElements === "string") {
    formElements = JSON.parse(formElements);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="col-lg-6 col-sm-12 p-2">
      <h3>Form Preview</h3>
      {isClient && (
        <Suspense fallback={<div>Loading...</div>}>
          <FormPreview formElements={formElements} />
        </Suspense>
      )}
      <StyleSheet />
    </main>
  );
};

const StyleSheet = () => {
  return (
    <style>
      {`
      .form-preview {
        max-height: 400px;
        overflow-y: auto;
        padding: 20px;
        border-radius: 10px;
        margin-top: 20px;
      }
      .form-preview::-webkit-scrollbar {
        width: 9px;
      }
      .form-preview::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px;
      }

      `}
    </style>
  );
};
