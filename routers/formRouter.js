import express from "express";
import Form from "../models/Form.js";
import { isAuth } from "../utils.js";

export const formRouter = express.Router();

formRouter.get("/my-forms", isAuth, async (req, res) => {
  const forms = await Form.findAll({ where: { author_id: req.user.id } });
  res.status(200).send({ forms: forms });
});

formRouter.post("/new", isAuth, async (req, res) => {
  const { title, description, formElements } = req.body;
  console.log({ title, description, formElements });
  const form = await Form.create({
    title,
    description,
    form_schema: JSON.stringify(formElements),
    author_id: req.user.id,
  });
  res.status(200).send({ form: form });
});

formRouter.get("/:id", isAuth, async (req, res) => {
  const form = await Form.findOne({ where: { id: req.params.id } });
  res.status(200).send({ form: form });
});
