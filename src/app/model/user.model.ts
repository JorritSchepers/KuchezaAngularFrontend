import * as shajs from 'sha.js'

export class UserModel {
    id: number;
    name: String;
    password: String;
    email: String;

    constructor(id: number, name: String, password: String, email: String) {
        this.id = id;
        this.name = name;
        this.password = shajs('sha256').update({password}).digest('hex');
        this.email = email;
      }
}