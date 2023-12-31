import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
  user_id: mongoose.Types.ObjectId,
  category_id: mongoose.Types.ObjectId,
  amount: Number,
  name: String,
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
