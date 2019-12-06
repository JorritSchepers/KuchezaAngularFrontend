import { Component } from '@angular/core';
import { AdminApi } from 'src/app/api/admin.api';
import { UserModel } from 'src/app/model/user.model';
import { AllUsersModel } from 'src/app/model/all-users.model';
import { LogoutApi } from 'src/app/api/logout.api';
import { LogoutResponseModel } from 'src/app/model/logout-response.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: UserModel[] = Array<UserModel>();
  popUpIsActive: boolean = false;
  currentSelectedUser: UserModel = null;

  constructor(private adminApi: AdminApi, private logoutApi: LogoutApi, private router: Router) {
    this.getAllNonAdminUsers();
  }

  private getAllNonAdminUsers(): void {
    this.adminApi.getAllNonAdminUsers().then(response => this.handleGetAllNonAdminUsersResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleGetAllNonAdminUsersResponse(response: AllUsersModel): void {
    this.initUsers(response);
  }

  showDeletePopUp(user: UserModel) {
    this.currentSelectedUser = user;
    this.popUpIsActive = true;
  }

  closeDeletePopUp() {
    this.currentSelectedUser = null;
    this.popUpIsActive = false;
  }
  
  deleteUser(userID: number) {
    this.adminApi.deleteUser(userID).then(response => this.handleDeleteUserResponse(response))
    .catch(exception => this.handleException(exception));
    this.closeDeletePopUp();
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

  logout(): void {
    this.logoutApi.logout().then(response => this.handleLogoutResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleLogoutResponse(response: LogoutResponseModel): void {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
