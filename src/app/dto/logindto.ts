import * as shajs from 'sha.js'

export class LoginDTO {
    constructor(private name: String, private password: String) {
      this.name = name;
      this.password = shajs('sha256').update({password}).digest('hex');
    }
}