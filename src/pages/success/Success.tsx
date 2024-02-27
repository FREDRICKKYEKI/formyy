import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/store";
import Info from "./Info";

interface SuccessProps {}

const Success: React.FC<SuccessProps> = () => {
  const form = useSelector((state: RootState) => state.form);
  const isClient = useSelector((state: RootState) => state.isClient);
  useEffect(() => {
    if (!form?.id) {
      window.location.href =
        "/?redirectFrom=submissionSuccess&error=NoFormfound";
    }
  }, []);
  return (
    <div className="d-flex justify-content-center flex-column align-items-center vh-100">
      {isClient && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Info form={form} />
        </Suspense>
      )}
    </div>
  );
};

export default Success;
