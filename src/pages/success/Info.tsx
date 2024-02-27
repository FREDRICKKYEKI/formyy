import React from "react";

interface InfoProps {
  form: any;
}

const Info: React.FC<InfoProps> = ({ form }) => {
  return (
    <div>
      {form && form?.id ? (
        <>
          <h1>🎉 </h1>
          <h3>Form submitted succesfully !</h3>
          <h4>
            Click <a href="/">here</a> to go back to home.
          </h4>
        </>
      ) : null}
    </div>
  );
};

export default Info;
