import axios from "axios";

export default class Auth {
  static pathVariable = "https://simplifysplit.herokuapp.com/";
  static signIn(authRequest) {
    let data = axios.post(`${this.pathVariable}sign-in`, authRequest);
    return data;
  }
  static signUp(authRequest) {
    let data = axios.post(`${this.pathVariable}sign-up`, authRequest);
    return data;
  }
}
