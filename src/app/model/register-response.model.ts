import { UserModel } from "./user.model";

export class RegisterResponse {
    user: UserModel;
    token: String;
}
