import Form from "../models/Form.js";
import { getUserFromToken } from "../utils.js";

import jwt from "jsonwebtoken";

/**
 * Retrieves server-side props based on the provided URL.
 * @param {string} req - The request object.
 * @returns {Promise} - A promise that resolves with the server-side props data.
 */
export default function getServerSideProps(req) {
  let url = req.originalUrl;
  if (url.endsWith("/")) url = url.slice(0, -1); // Remove trailing slash (if any)
  const baseUrl = url.split("/").slice(0, -1).join("/");

  const { cookies } = req;
  let user = {};
  // all server-side props are protected
  if (!cookies || !cookies.authToken) {
    return Promise.resolve();
  }

  user = jwt.verify(cookies.authToken, process.env.JWT_SECRET);
  switch (baseUrl) {
    case "":
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
    case "/form":
      let form_id = url.split("/").slice(-1)[0];
      console.log(form_id);
      return new Promise((resolve) => {
        Form.findOne({ where: { id: form_id } })
          .then((form) => {
            resolve({ form: form, formElements: form.form_schema });
          })
          .catch((err) => {
            resolve({ form: {}, formElements: {} });
          });
      });
    case "/form/edit":
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
    default:
      return Promise.resolve();
  }
}
