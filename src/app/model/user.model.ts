import * as shajs from 'sha.js'

export class UserModel {
  id: number;
  name: string;
  password: string;
  email: string;

  constructor(id: number, name: string, password: string, email: string) {
    this.id = id;
    this.name = name;
    this.password = shajs('sha256').update({password}).digest('hex');
    this.email = email;
  }
}
