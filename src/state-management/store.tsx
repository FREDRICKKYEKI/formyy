import { Reducer, configureStore } from "@reduxjs/toolkit";
import { BaseFormElementProps, ReduxInitialState, formElement } from "../types";
import { FormInput } from "../DataModels";

const ACTIONS = {
  // ACTIONS
  SET_SELECTED_FORM_ELEMENT: "SET_SELECTED_FORM_ELEMENT",
  SET_FORM_ELEMENTS: "SET_FORM_ELEMENTS",
  SET_ACTIVE_FORM_ELEMENT: "SET_ACTIVE_FORM_ELEMENT",
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

// initial state
const initialState: ReduxInitialState = {
  selectedFormElement: "input",
  formElements: [],
  activeFormElement: null,
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
