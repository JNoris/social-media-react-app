// Authentication Service

import axios from "axios";

const API_URL = "http://localhost:5001/api/auth/";

class AuthService {
  // POST {username, password} & save JWT to Local Storage
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  // remove JWT from Local Storage
  logout() {
    localStorage.removeItem("user");
  }

  // POST {username, email, password}
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  // get stored user information (including JWT)
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
