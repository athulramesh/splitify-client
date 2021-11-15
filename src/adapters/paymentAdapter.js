import axios from "axios";

export default class PaymentAdapter {
  static basePath = "https://simplifysplit.herokuapp.com/v1/api/";
  static recordPayment(currentUser, requestBody) {
    return axios.post(`${this.basePath}payments/`, requestBody, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }

  static getPaymentsDetails(currentUser, groupId, date) {
    return axios.get(
      `${this.basePath}payments/${groupId}/group/${currentUser?.userDetails.id}`,
      {
        params: { date: date },
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }
  static updatePayment(currentUser, paymentId, requestBody) {
    return axios.put(`${this.basePath}payments/${paymentId}/`, requestBody, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }

  static deletePayment(currentUser, paymentId, requestBody) {
    return axios.put(`${this.basePath}payments/${paymentId}/delete`, {
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
