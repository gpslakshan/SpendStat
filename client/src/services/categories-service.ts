// import { Category } from "../models/Category";
import apiClient from "./api-client";

class CategoriesService {
  //   createTransaction(transaction: Transaction) {
  //     return apiClient.post("/transactions", transaction);
  //   }

  //   getAllTransactions() {
  //     return apiClient.get("/transactions");
  //   }

  //   updateTransaction(id: string, transaction: Transaction) {
  //     return apiClient.put(`/transactions/${id}`, transaction);
  //   }

  deleteCategory(id: string) {
    return apiClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
