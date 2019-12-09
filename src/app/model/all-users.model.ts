import { UserModel } from './user.model';

export class AllUsersModel {
    users: UserModel[];

    constructor(users: UserModel[]) {
        this.users = users;
    }

    addUser(user: UserModel): void {
        this.users.push(user);
    }
}