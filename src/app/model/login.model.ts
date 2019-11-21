import * as shajs from 'sha.js'

export class LoginModel {
    constructor(private email: String, private password: String) {
      this.email = email;
      this.password = shajs('sha256').update({password}).digest('hex');
    }
}