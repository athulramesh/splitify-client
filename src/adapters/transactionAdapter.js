import axios from "axios";

export default class TransactionAdapter {
  static basePath = "https://simplifysplit.herokuapp.com/v1/api/";
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
