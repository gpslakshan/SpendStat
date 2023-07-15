import { Transaction } from "../models/Transaction";
import apiClient from "./api-client";

class TransactionsService {
  createTransaction(transaction: Transaction) {
    return apiClient.post("/transactions", transaction);
  }

  getAllTransactions() {
    return apiClient.get("/transactions");
  }

  updateTransaction(id: string, transaction: Transaction) {
    return apiClient.put(`/transactions/${id}`, transaction);
  }

  deleteTransaction(id: string) {
    return apiClient.delete(`/transactions/${id}`);
  }

  getCategorizedTransactions() {
    return apiClient.get("/transactions/categorized");
  }
}

export default new TransactionsService();
