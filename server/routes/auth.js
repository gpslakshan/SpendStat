import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

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

export default router;
