import express from "express";
import Form from "../models/Form.js";
import { isAuth } from "../utils.js";
import Submission from "../models/Submission.js";

export const formRouter = express.Router();

formRouter.get("/statusChange/", isAuth, async (req, res) => {
  const form = await Form.findOne({
    where: {
      id: req.query.id,
      author_id: req.user.id,
    },
  });
  if (!form) {
    res.status(404).send("Form not found");
    return;
  }
  try {
    form.form_state = req.query.state;
    await form.save();
    res.status(200).redirect(`/form/edit/${form.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating status" });
  }
});

formRouter.get("/delete/:id", isAuth, async (req, res) => {
  const form = await Form.findOne({
    where: {
      id: req.params.id,
      author_id: req.user.id,
    },
  });
  if (!form) {
    res.status(404).send("Form not found");
    return;
  }
  try {
    await form.destroy();
    res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting form <a href='/'>Go back</a>");
  }
});

formRouter.get("/my-forms", isAuth, async (req, res) => {
  try {
    const forms = await Form.findAll({
      where: { author_id: req.user.id },
      order: [["created_at", "DESC"]],
    });
    res.status(200).send({ forms: forms });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching forms" });
  }
});

formRouter.post("/new", isAuth, async (req, res) => {
  const { title, description, formElements, decayDate } = req.body;
  try {
    const form = await Form.create({
      title,
      description,
      decay_date: new Date(decayDate),
      form_schema: JSON.stringify(formElements),
      author_id: req.user.id,
    });
    res.status(200).send({ form: form });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating form" });
  }
});

formRouter.put("/:id", isAuth, async (req, res) => {
  const { formElements } = req.body;
  try {
    const form = await Form.findOne({ where: { id: req.params.id } });
    form.form_schema = JSON.stringify(formElements);
    await form.save();
    res.status(200).send({ message: "Form updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error updating form" });
    console.log(error);
  }
});

formRouter.get("/:id", isAuth, async (req, res) => {
  try {
    const form = await Form.findOne({ where: { id: req.params.id } });
    res.status(200).send({ form: form });
  } catch (error) {
    res.status(500).send({ message: "Error fetching form" });
    console.log(error);
  }
});

formRouter.post("/submissions", isAuth, async (req, res) => {
  const { form_id, submission_data } = req.query;
  if (!form_id || !submission_data) {
    res.status(400).send("Invalid request");
    return;
  }

  Submission.create({
    form_id: form_id,
    user_id: req.user.id,
    submission_data: submission_data,
  })
    .then(() => {
      res.status(200).redirect(`/success?form_id=${form_id}`);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send(
          "Error submitting form. <a href='#' onclick='window.history.back();'>Go back</a>"
        );
    });
});
