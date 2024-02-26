import express from "express";
import Form from "../models/Form.js";
import { isAuth } from "../utils.js";

export const formRouter = express.Router();

formRouter.get("/myforms", isAuth, async (req, res) => {
  const forms = await Form.findAll({ where: { author_id: req.user.id } });
  res.status(200).send({ forms: forms });
});
