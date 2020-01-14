import * as shajs from 'sha.js'

export class LoginModel {
  email: string;
  password: string;

    constructor(email: string, password: string) {
      this.email = email;
      this.password = shajs('sha256').update(password).digest('hex');
    }
}
