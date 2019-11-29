import { UserModel } from "./user.model";

export class RegisterResponse {
  user: UserModel;
  token: string;

  constructor(user: UserModel, token: string) {
    this.user = user;
    this.token = token;
  }
}
