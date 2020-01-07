import * as shajs from 'sha.js'

export class RegisterModel {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;

    constructor(name: string, email: string, password: string, repeatPassword: string) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.repeatPassword = repeatPassword;
    }
}
