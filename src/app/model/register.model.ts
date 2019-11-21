import * as shajs from 'sha.js'

export class RegisterModel {
    constructor(private name: String, private email: String, private password: String, private repeatPassword: String) {
      this.name = name;
      this.email = email;
      this.password = shajs('sha256').update({password}).digest('hex');
      this.repeatPassword = shajs('sha256').update({repeatPassword}).digest('hex');
    }
}
