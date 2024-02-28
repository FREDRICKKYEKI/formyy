import { Reducer, configureStore } from "@reduxjs/toolkit";
import { BaseFormElementProps, ReduxInitialState, formElement } from "../types";

const ACTIONS = {
  // ACTIONS
  SET_SELECTED_FORM_ELEMENT: "SET_SELECTED_FORM_ELEMENT",
  SET_FORM_ELEMENTS: "SET_FORM_ELEMENTS",
  SET_ACTIVE_FORM_ELEMENT: "SET_ACTIVE_FORM_ELEMENT",
  SET_FORMS: "SET_FORMS",
  SET_IS_CLIENT: "SET_IS_CLIENT",
  SET_SUBMISSIONS: "SET_SUBMISSIONS",
};

// action creators
export const setSelectedFormElement = (selectedFormElement: formElement) => {
  return {
    type: ACTIONS.SET_SELECTED_FORM_ELEMENT,
    payload: selectedFormElement,
  };
};

export const setFormElements = (formElements: BaseFormElementProps[]) => {
  return {
    type: ACTIONS.SET_FORM_ELEMENTS,
    payload: formElements,
  };
};

export const setActiveFormElement = (
  activeFormElement: BaseFormElementProps
) => {
  return {
    type: ACTIONS.SET_ACTIVE_FORM_ELEMENT,
    payload: activeFormElement,
  };
};

export const setForms = (forms: any) => {
  return {
    type: ACTIONS.SET_FORMS,
    payload: forms,
  };
};

export const setIsClient = (isClient: boolean) => {
  return {
    type: ACTIONS.SET_IS_CLIENT,
    payload: isClient,
  };
};

export const setSubmissions = (submissions: any) => {
  return {
    type: ACTIONS.SET_SUBMISSIONS,
    payload: submissions,
  };
};

// initial state
const initialState: ReduxInitialState = {
  selectedFormElement: "input",
  formElements: [],
  activeFormElement: null,
  forms: [],
  isClient: false,
  form: {},
  submissions: [],
};
// Reducers

export const reducer = (
  state = initialState,
  { type, payload }: { type: string; payload: string }
) => {
  switch (type) {
    case ACTIONS.SET_SELECTED_FORM_ELEMENT:
      return {
        ...state,
        selectedFormElement: payload,
      };
    case ACTIONS.SET_FORM_ELEMENTS:
      return {
        ...state,
        formElements: payload,
      };
    case ACTIONS.SET_ACTIVE_FORM_ELEMENT:
      return {
        ...state,
        activeFormElement: payload,
      };
    case ACTIONS.SET_FORMS:
      return {
        ...state,
        forms: payload,
      };
    case ACTIONS.SET_IS_CLIENT:
      return {
        ...state,
        isClient: payload,
      };
    case ACTIONS.SET_SUBMISSIONS:
      return {
        ...state,
        submissions: payload,
      };
    default:
      return state;
  }
};

// configure store
export const store = configureStore({
  reducer: reducer as Reducer<
    ReduxInitialState,
    { type: string; payload: string }
  >,
});

// export store
export type RootState = ReturnType<typeof store.getState>;
