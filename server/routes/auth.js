import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  //1. check if user exist with the same username
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ message: "Email address already exists" });
    return;
  }

  //2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //3. Store the user in DB
  const user = new User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });
  await user.save();

  res.status(201).json({ message: "User is created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).json({ message: "Invalid Login credentials" });
    return;
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    res.status(403).json({ message: "Invalid Login credentials" });
    return;
  }

  // create jwt token
  const payload = { username: user.email, _id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "success", token });
});

export default router;
