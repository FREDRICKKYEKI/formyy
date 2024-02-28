import React from "react";
import { useSearchParams } from "react-router-dom";

interface InfoProps {
  form: any;
}

const Info: React.FC<InfoProps> = ({ form }) => {
  let [searchParams, _setSearchParams] = useSearchParams();

  return (
    <div>
      {form && form?.id ? (
        <div className="text-center">
          <h1>🎉</h1>
          {searchParams.get("message") == "already_submitted" ? (
            <h3>Form already submitted!</h3>
          ) : (
            <h3>Form submitted succesfully!</h3>
          )}
          <h4>
            Click <a href="/">here</a> to go back to home.
          </h4>
        </div>
      ) : null}
    </div>
  );
};

export default Info;
