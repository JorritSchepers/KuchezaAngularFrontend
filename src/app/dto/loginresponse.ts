import { UserDTO } from "./userdto";

export class LoginResponse {
    user: UserDTO;
    token: String;
}