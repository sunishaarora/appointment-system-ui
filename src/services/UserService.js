import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8100/api/v1";

class UserService {
  saveUser(user) {
    return axios.post(USER_API_BASE_URL + "/users", user);
  }
  getUsers() {
    return axios.get(USER_API_BASE_URL + "/users");
  }
  deleteUser(userId){
    return axios.delete(USER_API_BASE_URL + "/deleteUser/" + userId)
  }
  updateUser(userId){
    return axios.put(USER_API_BASE_URL + "/updateUser/" + userId)
  }
  getUserByName(firstName, lastName){
    return axios.get(USER_API_BASE_URL + "/user/search/" + firstName + "/" + lastName)
  }

}

export default new UserService();