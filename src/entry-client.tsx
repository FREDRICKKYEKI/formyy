import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { reducer } from "./state-management/store";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: reducer,
  preloadedState: (window as any).__GLOBAL_STATE__,
});

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
