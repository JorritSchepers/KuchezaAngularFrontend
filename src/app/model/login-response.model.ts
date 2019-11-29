import { UserModel } from "./user.model";

export class LoginResponseModel {
    user: UserModel;
    token: string;

    constructor(user: UserModel, token: string) {
        this.user = user;
        this.token = token;
    }
}
