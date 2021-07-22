import axios from "axios";

export default class TransactionAdapter {
  static basePath = "http://localhost:8080/v1/api/";
  static getGroupWiseTransactions(currentUser) {
    return axios.get(
      `${this.basePath}transactions/${currentUser?.userDetails.id}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }

  static getIndividualTransaction(currentUser, groupId) {
    return axios.get(
      `${this.basePath}transactions/${currentUser?.userDetails.id}/group/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }
}
