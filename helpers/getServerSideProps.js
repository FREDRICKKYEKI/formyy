import Form from "../models/Form.js";
import { getUserFromToken } from "../utils.js";

import jwt from "jsonwebtoken";

/**
 * Retrieves server-side props based on the provided URL.
 * @param {string} req - The request object.
 * @returns {Promise} - A promise that resolves with the server-side props data.
 */
export default function getServerSideProps(req) {
  const url = req.originalUrl;
  const baseUrl = url.split("/").slice(0, -1).join("/");
  switch (baseUrl) {
    case "":
      const { cookies } = req;
      const user = jwt.verify(cookies.authToken, process.env.JWT_SECRET);
      console.log(user);
      if (!user.id) return Promise.resolve();
      return new Promise((resolve) => {
        Form.findAll({ where: { author_id: user.id } })
          .then((forms) => {
            resolve({ forms: forms });
          })
          .catch((err) => {
            resolve({ forms: [] });
          });
      });
    case "/form/edit":
      const id = url.split("/").slice(-1)[0];
      return new Promise((resolve) => {
        Form.findOne({ where: { id: id } })
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
