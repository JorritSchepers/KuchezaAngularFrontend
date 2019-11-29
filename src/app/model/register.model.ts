import * as shajs from 'sha.js'

export class RegisterModel {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;

    constructor(name: string, email: string, password: string, repeatPassword: string) {
      this.name = name;
      this.email = email;
      this.password = shajs('sha256').update({password}).digest('hex');
      this.repeatPassword = shajs('sha256').update({repeatPassword}).digest('hex');
    }
}
