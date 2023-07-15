import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const categories = [
  { label: "Housing", icon: "Housing" },
  { label: "Transportation", icon: "Transportation" },
  { label: "Food", icon: "Food" },
  { label: "Utilities", icon: "Utilities" },
  { label: "Insurance", icon: "Insurance" },
  { label: "Medical & Healthcare", icon: "Medical & Healthcare" },
  { label: "Investment", icon: "Investment" },
  { label: "Personal Spending", icon: "Personal Spending" },
  { label: "Recreation", icon: "Recreation" },
  { label: "Entertainment", icon: "Entertainment" },
  { label: "Miscellaneous", icon: "Miscellaneous" },
];

export const signup = async (req, res) => {
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
    categories,
  });
  await user.save();

  res.status(201).json({ message: "User is created successfully" });
};

export const login = async (req, res) => {
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
  res.json({ message: "success", token, user });
};
