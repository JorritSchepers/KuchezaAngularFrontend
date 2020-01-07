import * as shajs from 'sha.js'

export class UserModel {
  id: number;
  name: string;
  password: string;
  email: string;
  admin: boolean;

  constructor(id: number, name: string, password: string, email: string, admin?: boolean) {
    this.id = id;
    this.name = name;
    this.password = shajs('sha256').update(password).digest('hex');
    this.email = email;
    this.admin = admin;
  }
}
