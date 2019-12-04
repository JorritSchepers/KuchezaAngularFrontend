import { UserModel } from "./user.model";

export class RegisterResponseModel {
  user: UserModel;
  token: string;

  constructor(user: UserModel, token: string) {
    this.user = user;
    this.token = token;
  }
}
