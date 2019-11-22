import { UserModel } from "./user.model";

export class LoginResponseModel {
    user: UserModel;
    token: String;

    constructor(user: UserModel, token: String) {
        this.user = user;
        this.token = token;
    }
}