import axios from "axios";

export default class PaymentAdapter {
  static basePath = "http://localhost:8080/v1/api/";
  static recordPayment(currentUser, requestBody) {
    return axios.post(`${this.basePath}payments/`, requestBody, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }

  static addGroup(currentUser, requestBody) {
    return axios.post(
      `${this.basePath}groups/${currentUser?.userDetails.id}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }

  static getGroupDetails(currentUser, groupId) {
    return axios.get(`${this.basePath}groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }
}
