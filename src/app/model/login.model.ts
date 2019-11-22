import * as shajs from 'sha.js'

export class LoginModel {
  email: String;
  password: String;

    constructor(email: String, password: String) {
      this.email = email;
      this.password = shajs('sha256').update({password}).digest('hex');
    }
}