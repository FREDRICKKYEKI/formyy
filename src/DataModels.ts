/**
 * Data Models for the form elements
 */
import {
  CheckboxProps,
  ButtonProps,
  InputProps,
  SelectOptionProps,
  TextAreaProps,
  CheckboxGroupProps,
} from "./types";

export const FormInput: InputProps = {
  id: "313ef7b1-1e5b-46b4-9dc8-80cb7c1c3f26",
  element: "input",
  required: true,
  type: "text",
  name: "FormInput",
  label: "Text",
  defaultValue: "",
  disabled: false,
  placeholder: "Enter Label for the form input...",
};

export const FormTextArea: TextAreaProps = {
  id: "043918e0-1ae3-494e-933f-c3acdd7090e2",
  element: "textarea",
  required: true,
  label: "Textarea",
  name: "FormTextArea",
  rows: 4,
  defaultValue: "",
  disabled: false,
  placeholder: "Enter Label for the form textarea...",
};

export const FormButton: ButtonProps = {
  id: "4df84b8e-5604-4f18-85ac-299fdfacfd78",
  element: "button",
  text: "Submit",
};

export const FormOption: SelectOptionProps = {
  id: "03a17405-ba3d-4d95-9188-f8de0aac5579",
  element: "select",
  required: true,
  label: "Option",
  name: "FormOption",
  options: [
    {
      id: "314db365-a5e2-43e9-98c8-aedfcbfe1123",
      element: "option",
      defaultValue: "Option",
    },
    {
      id: "76a0cc07-694a-4b56-a342-ff5fb6c5a71e",
      element: "option",
      defaultValue: "Option",
    },
    {
      id: "07b06849-b83c-4ee2-9687-a46dde34e422",
      element: "option",
      defaultValue: "Option",
    },
  ],
};

export const FormCheckbox: CheckboxProps = {
  id: "63a5888d-4862-49b5-aa96-2a2aa067e557",
  element: "checkbox",
  label: "Checkbox",
  checked: false,
  disabled: false,
  name: "FormCheckbox",
  defaultValue: "Checkbox",
};

export const CheckboxGroup: CheckboxGroupProps = {
  id: "63a5888d-4862-49b5-aa96-2a2aa067e557",
  element: "checkbox-group",
  label: "Checkbox Group",
  name: "CheckboxGroup",
  checks: [
    {
      id: "63a5888d-4862-49b5-aa96-2a2aa067e557",
      element: "checkbox",
      label: "Checkbox",
      checked: false,
      disabled: false,
      name: "CheckboxGroup",
      defaultValue: "Checkbox",
    },
    {
      id: "63a5888d-4862-49b5-aa96-2a2aa067e557",
      element: "checkbox",
      label: "Checkbox",
      checked: false,
      disabled: false,
      name: "CheckboxGroup",
      defaultValue: "Checkbox",
    },
  ],
};
