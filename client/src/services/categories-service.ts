import { Category } from "../models/Category";
import apiClient from "./api-client";

class CategoriesService {
  createCategory(category: Category) {
    return apiClient.post("/categories", category);
  }

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
