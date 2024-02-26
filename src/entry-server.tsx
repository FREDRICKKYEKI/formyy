import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state-management/store";
import { StaticRouter } from "react-router-dom/server";
import { Request } from "express";

export function render(req: Request) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={req.originalUrl}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );
  return { html };
}
