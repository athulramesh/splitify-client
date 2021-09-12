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

  static getUserExpenses(currentUser, groupId) {
    return axios.get(
      `${this.basePath}expenses/${currentUser?.userDetails.id}/group/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }

  static updateExpense(currentUser, expenseId, requestBody) {
    return axios.put(`${this.basePath}expenses/${expenseId}/`, requestBody, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }

  static deleteExpense(currentUser, expenseId) {
    return axios.put(`${this.basePath}expenses/${expenseId}/delete`, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }
}
