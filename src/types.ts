/**
 * Represents the properties for a Modal.
 */
export interface MainFormElementModalProps {
  open: boolean;
  onClose: () => void;
  handleFormElementsUpdate: (state: BaseFormElementProps[]) => void;
}

export interface ReduxInitialState {
  selectedFormElement: formElement;
  formElements: BaseFormElementProps[];
  activeFormElement: BaseFormElementProps | null;
}

/**
 * Represents the properties for a FormElement component.
 */
export type formElement =
  | "input"
  | "textarea"
  | "button"
  | "option"
  | "select"
  | "radio"
  | "checkbox"
  | "checkbox-group"
  | "radio-group";

/**
 * Represents the properties for a FormElement component.
 * @param id - The unique identifier for the form element.
 * @param element - The type of form element.
 */
export interface BaseFormElementProps {
  id: ReturnType<typeof crypto.randomUUID>;
  element: formElement;
  type?: string | undefined;
  name?: string | undefined;
  required?: boolean;
  label?: string;
  placeholder?: string;
  options?: OptionProps[];
  defaultValue?: string;
  checked?: boolean;
  rows?: number;
  cols?: number;
  text?: string;
  disabled?: boolean;
  [key: string]: any;
}

/**
 * Represents the properties for a FormElement component.
 */
export interface InputProps extends BaseFormElementProps {
  type: string | undefined; // "text" | "number" | "email" | "password";
  name: string | undefined;
  label: string;
  placeholder: string;
  required: boolean;
}

/**
 * Represents the properties for a TextArea component.
 */
export interface TextAreaProps extends BaseFormElementProps {
  name: string | undefined;
  rows: number;
  label: string;
  placeholder: string;
  required: boolean;
}

/**
 * Represents the properties for a Button component.
 */
export interface ButtonProps extends BaseFormElementProps {
  text: string;
}

/**
 * Represents the properties for a Select component.
 */
export interface SelectOptionProps extends BaseFormElementProps {
  label: string;
  name: string;
  required: boolean;
  options: OptionProps[];
}

/**
 * Represents the properties for an Option component.
 */
export interface OptionProps extends BaseFormElementProps {
  defaultValue: string;
}

/**
 * Represents the properties for a Radio component.
 */
export interface RadioProps extends BaseFormElementProps {
  label: string;
  defaultValue: string;
  name: string;
  checked: boolean;
}

/**
 * Represents the properties for a Checkbox component.
 */
export interface CheckboxProps extends BaseFormElementProps {
  label: string;
  name: string;
  defaultValue: string;
  checked: boolean;
}

/**
 * Represents the properties for a RadioGroup component.
 */
export interface RadioGroupProps extends BaseFormElementProps {
  label: string;
  options: RadioProps[];
}

/**
 * Represents the properties for a CheckboxGroup component.
 */
export interface CheckboxGroupProps extends BaseFormElementProps {
  label: string;
  checks: CheckboxProps[];
}
