import apiClient from "./api-client";

class UserService {
  fetchUser() {
    return apiClient.get("/user");
  }
}

export default new UserService();
