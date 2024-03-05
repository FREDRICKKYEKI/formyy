import express from "express";
import User from "../models/User.js";
import Form from "../models/Form.js";
import Submission from "../models/Submission.js";

export const miscRouter = express.Router();

/**
 * This router handles the following routes:
 * GET /status
 * GET /ping
 * GET /stats
 */

// check status
miscRouter.get("/status", (_req, res) => {
  res.status(200).send({ status: "ok" });
});

// ping
miscRouter.get("/ping", (_req, res) => {
  res.status(200).send({ message: "pong" });
});

// stats - db counts for all models
miscRouter.get("/stats", async (_req, res) => {
  try {
    const users = await User.count();
    const forms = await Form.count();
    const submissions = await Submission.count();
    res.status(200).send({ users, forms, submissions });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error fetching stats" });
  }
});
