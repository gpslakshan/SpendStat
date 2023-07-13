import Transaction from "../models/transaction.js";

export const fetchTransactions = async (req, res) => {
  const transactions = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ transactions });
};

export const createTransaction = async (req, res) => {
  const { name, amount, date } = req.body;
  const transaction = new Transaction({
    amount,
    name,
    date,
  });
  await transaction.save();
  res.json({ statusCode: 201, message: "Success" });
};

export const updateTransaction = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Success" });
};

export const deleteTransaction = async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "Success" });
};
