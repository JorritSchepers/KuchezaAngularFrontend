import { UserModel } from "./user.model";

export class RegisterResponse {
    constructor(private user: UserModel, private token: String) {
      this.user = user;
      this.token = token;
    }
}
