import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/management-system";

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
  updateUser(userId, user){
    return axios({method: "put", url: USER_API_BASE_URL + "/updateUser/" + userId, data: user})
  }
  getUserByName(firstName, lastName){
    return axios.get(USER_API_BASE_URL + "/user/search/" + firstName + "/" + lastName)
  }
}

export default new UserService();