import { Component } from '@angular/core';
import { AdminApi } from 'src/app/api/admin.api';
import { UserModel } from 'src/app/model/user.model';
import { AllUsersModel } from 'src/app/model/all-users.model';
import { AllPlotModel } from 'src/app/model/allplot.model';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: UserModel[] = Array<UserModel>();
  popUpIsActive: boolean = false;

  constructor(private adminApi: AdminApi) {
    this.getAllNonAdminUsers();
  }

  private getAllNonAdminUsers(): void {
    this.adminApi.getAllNonAdminUsers().then(response => this.handleGetAllNonAdminUsersResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleGetAllNonAdminUsersResponse(response: AllUsersModel): void {
    this.initUsers(response);
  }

  showDeletePopUp(userID: number) {
    this.popUpIsActive = true;
  }
  
  deleteUser(userID: number) {
    this.adminApi.deleteUser(userID).then(response => this.handleDeleteUserResponse(response))
    .catch(exception => this.handleException(exception));
  }

  private handleDeleteUserResponse(response: AllUsersModel) {
    this.users = Array<UserModel>();
    this.initUsers(response);
  }

  private initUsers(users: AllUsersModel) {
    for (let user of users.users) {
      this.users.push(user);
    }
  }

  private handleException(exception: any): void {
    console.warn(exception);
  }
}
