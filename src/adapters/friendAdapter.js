import axios from "axios";

export default class Friend {
  static basePath = "http://localhost:8080/v1/api/";
  static getFriends(currentUser) {
    return axios.get(
      `${this.basePath}connections/${currentUser?.userDetails.id}`,
      {
        params: { type: "ACTIVE" },
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }
  acceptRequest;

  static acceptRequest(currentUser, requestBody) {
    return axios.put(
      `${this.basePath}connections/${currentUser?.userDetails.id}/approve`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }
  static getFriendRequests(currentUser) {
    return axios.get(
      `${this.basePath}connections/${currentUser?.userDetails.id}`,
      {
        params: { type: "NEW" },
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }
  static getUserByUserName(currentUser, userName) {
    return axios.get(`${this.basePath}users`, {
      params: { userName: userName },
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }

  static sendFriendRequest(currentUser, requestBody) {
    return axios.post(
      `${this.basePath}connections/${currentUser?.userDetails.id}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }

  static rejectRequest(currentUser, requestBody) {
    return axios.put(
      `${this.basePath}connections/${currentUser?.userDetails.id}/reject`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }

  static cancelRequest(currentUser, requestBody) {
    return axios.put(
      `${this.basePath}connections/${currentUser?.userDetails.id}/cancel`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }
}
