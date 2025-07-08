// src/services/auth.service.js
import axios from "axios";

const API_URL = "http://localhost:8081/hospital/api/auth/";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + "login", {
        usernameOrEmail: username,
        password: password,
      });

      // SỬA DÒNG NÀY: Kiểm tra `response.data.token`
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("AuthService login error:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      localStorage.removeItem("user");
      return null;
    }
  }
}

export default new AuthService();