import axios from "axios";

export default class ExpenseAdapter {
  static basePath = "http://localhost:8080/v1/api/";
  static recordExpense(currentUser, requestBody) {
    return axios.post(`${this.basePath}expenses/`, requestBody, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }
}
