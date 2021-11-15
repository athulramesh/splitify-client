import axios from "axios";

export default class GroupAdapter {
  static basePath = "https://simplifysplit.herokuapp.com/v1/api/";
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

  static addGroupMember(currentUser, groupId, requestBody) {
    return axios.post(
      `${this.basePath}groups/${groupId}/add-member`,
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

  static removeGroupMember(currentUser, groupId, requestBody) {
    return axios.put(
      `${this.basePath}groups/${groupId}/remove-member`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      }
    );
  }

  static deleteGroup(currentUser, groupId) {
    return axios.put(`${this.basePath}groups/${groupId}/delete`, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }

  static updateGroup(currentUser, groupId, requestBody) {
    return axios.put(`${this.basePath}groups/${groupId}`, requestBody, {
      headers: {
        Authorization: `Bearer ${currentUser?.jwt}`,
      },
    });
  }
}
