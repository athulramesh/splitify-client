import axios from "axios";

export default class Auth {
  static pathVariable = "http://localhost:8080/";
  static signIn(authRequest) {
    let data = axios.post(`${this.pathVariable}sign-in`, authRequest);
    return data;
  }
}
