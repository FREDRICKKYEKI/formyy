import Form from "../models/Form.js";
import { getUserFromToken } from "../utils.js";

import jwt from "jsonwebtoken";

/**
 * Retrieves server-side props based on the provided URL.
 * @param {Request} req - The request object.
 * @returns {Promise} - A promise that resolves with the server-side props data.
 */
export default function getServerSideProps(req) {
  let url = req.originalUrl;
  if (url.length > 1 && url.endsWith("/")) url = url.slice(0, -1); // Remove trailing slash (if any)
  const baseUrl = url.split("/").slice(0, -1).join("/");
  console.log("url:", url);

  const { cookies } = req;
  let user = {};
  // all server-side props are protected
  if (!cookies || !cookies.authToken) {
    return Promise.resolve();
  }

  user = jwt.verify(cookies.authToken, process.env.JWT_SECRET);
  if (!user) {
    return Promise.resolve();
  }

  switch (true) {
    case url.split("?")[0] == "/":
      if (!user.id) return Promise.resolve();
      return new Promise((resolve) => {
        Form.findAll({
          where: { author_id: user.id },
          order: [["created_at", "DESC"]], // Sort by created_at in descending order
        })
          .then((forms) => {
            resolve({ forms: forms });
          })
          .catch((err) => {
            console.log(err);
            resolve({ forms: [] });
          });
      });
    case url.startsWith("/form/edit"):
      let id = url.split("/").slice(-1)[0];
      return new Promise((resolve) => {
        Form.findOne({
          where: {
            id: id,
            author_id: user.id,
          },
        })
          .then((form) => {
            resolve({ form: form, formElements: form.form_schema });
          })
          .catch((err) => {
            resolve({ formElements: {} });
          });
      });
    case url.startsWith("/form"):
      let form_id_ = url.split("/").slice(-1)[0];
      console.log(form_id_);
      return new Promise((resolve) => {
        Form.findOne({ where: { id: form_id_ } })
          .then((form) => {
            resolve({ form: form, formElements: form.form_schema });
          })
          .catch((err) => {
            resolve({ form: {}, formElements: {} });
          });
      });

    case url.startsWith("/success"):
      const { form_id } = req.query;
      return new Promise((resolve) => {
        Form.findOne({ where: { id: form_id, author_id: user.id } })
          .then((form) => {
            console.log(form);
            resolve({ form: form });
          })
          .catch((err) => {
            console.log(err);
            resolve({ form: {} });
          });
      });

    default:
      return Promise.resolve();
  }
}
