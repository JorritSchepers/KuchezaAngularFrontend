import { UserModel } from "./user.model";

export class LoginResponseModel {
    user: UserModel;
    token: String;
}