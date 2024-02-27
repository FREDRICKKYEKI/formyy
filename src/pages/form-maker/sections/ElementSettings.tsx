import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state-management/store";
import { FormGroup } from "../../../components/FormGroup";

const ElementProperties: FC = () => {
  const activeFormElement = useSelector(
    (state: RootState) => state.activeFormElement
  );
  return (
    <div className="element-properties overflow-y-scroll p-2">
      {activeFormElement ? (
        <form>
          {Object.keys(activeFormElement).map((key) => {
            return (
              <div key={`${crypto.randomUUID()}`}>
                <FormGroup className="w-100">
                  <label>{key}: </label>
                  <input
                    name={activeFormElement.name}
                    type="text"
                    disabled={true}
                    className="active-el p-1 w-100"
                    defaultValue={
                      activeFormElement[key] ? activeFormElement[key] : "N/A"
                    }
                  />
                </FormGroup>
              </div>
            );
          })}
        </form>
      ) : (
        <p className="text-center ">No active element selected</p>
      )}
    </div>
  );
};

export const ElementSettings: FC = () => {
  return (
    <div className=" r_sidebar col-lg-3 col-sm-12s p-2">
      <div className="d-flex justify-content-between">
        <h3>Element Settings</h3>
      </div>
      <ElementProperties />
      <StyleSheet />
    </div>
  );
};

const StyleSheet = () => {
  return (
    <style>
      {`
            .active-el {
                border: 1px solid #ccc;
                font-weight: bold;
                background-color: #ddd;
                border-radius: 5px;
            }
            .element-properties {
                border: 1px solid #ccc;
                height: 400px;
                border-radius: 5px;
            }
            .element-properties::-webkit-scrollbar {
              width: 9px;
            }
            .element-properties::-webkit-scrollbar-thumb {
              background-color: #ccc;
              border-radius: 10px;
            }
            `}
    </style>
  );
};
