import axios from "axios";

export default class GroupAdapter {
  static basePath = "http://localhost:8080/v1/api/";
  static getAllGroups(currentUser) {
    return axios.get(
      `${this.basePath}groups/${currentUser?.userDetails.id}/all-groups`,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
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
