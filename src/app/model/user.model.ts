import * as shajs from 'sha.js'

export class UserModel {
    constructor(private id: Number, private name: String, private password: String, private email: String) {
      this.id = id;
      this.name = name;
      this.password = shajs('sha256').update({password}).digest('hex');
      this.email = email;
    }
}
