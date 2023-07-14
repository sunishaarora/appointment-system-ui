import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8100/api/v1";

class UserService {
  saveUser(user) {
    return axios.post(USER_API_BASE_URL + "/users", user);
  }
  getUsers() {
    return axios.get(USER_API_BASE_URL + "/users");
  }

}

export default new UserService();