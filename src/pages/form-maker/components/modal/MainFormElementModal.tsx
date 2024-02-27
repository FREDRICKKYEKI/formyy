import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state-management/store";
import { Modal } from "react-responsive-modal";
import { MainFormElementModalProps } from "../../../../types";
import { InputModalContents } from "./modal-contents/InputModalContents";
import { TextAreaModalContents } from "./modal-contents/TextAreaModalContents";
import { ButtonModalContents } from "./modal-contents/ButtonModalContents";
import { OptionModalContents } from "./modal-contents/OptionModalContents";
import { CheckboxModalContents } from "./modal-contents/CheckBoxModalContents";

const ModalContentMap: { [key: string]: any } = {
  input: (props: MainFormElementModalProps) => (
    <InputModalContents {...props} />
  ),
  textarea: (props: MainFormElementModalProps) => (
    <TextAreaModalContents {...props} />
  ),
  button: (props: MainFormElementModalProps) => (
    <ButtonModalContents {...props} />
  ),
  option: (props: MainFormElementModalProps) => (
    <OptionModalContents {...props} />
  ),
  checkbox: (props: MainFormElementModalProps) => (
    <CheckboxModalContents {...props} />
  ),
};

export const MainFormElementModal: FC<MainFormElementModalProps> = (props) => {
  const selectedFormElement = useSelector(
    (state: RootState) => state.selectedFormElement
  );
  return (
    <Modal center {...props} classNames={{ root: "p-5" }}>
      <div className="mt-3">
        {ModalContentMap[selectedFormElement || "input"](props)}
      </div>
    </Modal>
  );
};
