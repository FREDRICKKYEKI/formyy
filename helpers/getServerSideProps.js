import Form from "../models/Form.js";

/**
 * Retrieves server-side props based on the provided URL.
 * @param {string} url - The URL to determine the server-side props for.
 * @returns {Promise} - A promise that resolves with the server-side props data.
 */
export default function getServerSideProps(url) {
  const baseUrl = url.split("/").slice(0, -1).join("/");
  switch (baseUrl) {
    case "/form/edit":
      const id = url.split("/").slice(-1)[0];
      console.log(id);
      return new Promise((resolve, reject) => {
        Form.findOne({ where: { id: id } })
          .then((form) => {
            resolve({ form: form });
          })
          .catch((err) => {
            resolve({ form: {} });
          });
      });
    default:
      return Promise.resolve();
  }
}
