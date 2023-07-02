import { Router } from "express";
import Transaction from "../models/transaction.js";

const router = Router();

router.get("/", async (req, res) => {
  const transactions = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ transactions });
});

router.post("/", async (req, res) => {
  const { name, amount, date } = req.body;
  const transaction = new Transaction({
    amount,
    name,
    date,
  });
  await transaction.save();
  res.json({ statusCode: 201, message: "Success" });
});

export default router;
