import express from "express";
import Form from "../models/Form.js";
import { isAuth } from "../utils.js";

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
  console.log(req.params.id);
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
  const forms = await Form.findAll({
    where: { author_id: req.user.id },
    order: [["created_at", "DESC"]],
  });
  res.status(200).send({ forms: forms });
});

formRouter.post("/new", isAuth, async (req, res) => {
  const { title, description, formElements, decayDate } = req.body;
  const form = await Form.create({
    title,
    description,
    decay_date: new Date(decayDate),
    form_schema: JSON.stringify(formElements),
    author_id: req.user.id,
  });
  res.status(200).send({ form: form });
});

formRouter.put("/:id", isAuth, async (req, res) => {
  const { formElements } = req.body;
  const form = await Form.findOne({ where: { id: req.params.id } });
  try {
    form.form_schema = JSON.stringify(formElements);
    await form.save();
    res.status(200).send({ message: "Form updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error updating form" });
    console.log(error);
  }
});

formRouter.get("/:id", isAuth, async (req, res) => {
  const form = await Form.findOne({ where: { id: req.params.id } });
  res.status(200).send({ form: form });
});
