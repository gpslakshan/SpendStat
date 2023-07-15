import { Category } from "../models/Category";
import apiClient from "./api-client";

class CategoriesService {
  createCategory(category: Category) {
    return apiClient.post("/categories", category);
  }

  //   getAllTransactions() {
  //     return apiClient.get("/transactions");
  //   }

  updateCategory(id: string, category: Category) {
    return apiClient.put(`/categories/${id}`, category);
  }

  deleteCategory(id: string) {
    return apiClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
