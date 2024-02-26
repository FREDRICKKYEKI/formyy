import express from "express";
import Form from "../models/Form.js";
import { isAuth } from "../utils.js";

export const formRouter = express.Router();

formRouter.get("/my-forms", isAuth, async (req, res) => {
  const forms = await Form.findAll({ where: { author_id: req.user.id } });
  res.status(200).send({ forms: forms });
});

formRouter.post("/new", isAuth, async (req, res) => {
  const form = req.body.schema;
  res.status(200).send({ message: "success" });
});
