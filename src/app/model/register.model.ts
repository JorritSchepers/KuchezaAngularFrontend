import * as shajs from 'sha.js'

export class RegisterModel {
    name: String;
    email: String;
    password: String;
    repeatPassword: String;

    constructor(name: String, email: String, password: String, repeatPassword: String) {
      this.name = name;
      this.email = email;
      this.password = shajs('sha256').update({password}).digest('hex');
      this.repeatPassword = shajs('sha256').update({repeatPassword}).digest('hex');
    }
}
