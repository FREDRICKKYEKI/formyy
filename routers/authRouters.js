import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils.js";
import bcrypt from "bcrypt";

export const authRouter = express.Router();
// create admin
authRouter.get("/create-admin", async (req, res) => {
  if (process.env.MODE !== "dev") {
    return res.status(401).send("Unauthorized");
  }
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);
    const user = await User.create({
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).send({
      userInfo: {
        email: user.email,
        role: user.role,
        id: user.id,
        password: "admin",
      },
    });
  } catch (e) {
    console.error("Error creating admin:", e);
    res.status(401).send("Error creating admin");
  }
});

// signup
authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    let userWithoutPw = Object.fromEntries(
      Object.entries(user.toJSON()).filter(([key]) => key !== "password")
    );

    res
      .status(201)
      .send({ message: "User created successfully", user: userWithoutPw });
  } catch (e) {
    console.error("Error signing up:", e);
    res.status(401).send({ error: "Error signing up" });
  }
});

// login

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ error: "Invalid user" });
    }
    // Compare provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    const authToken = generateToken(user);
    res.status(200).send({
      authToken: authToken,
      userInfo: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("Error logging in:", e);
    res.status(401).send("Error logging in");
  }
});
