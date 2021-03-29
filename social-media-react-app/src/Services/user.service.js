import axios from "axios";
import authHeader from "./auth-header";

// Data Service, meant for accessing data
const API_URL = "http://localhost:5001/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}

export default new UserService();
