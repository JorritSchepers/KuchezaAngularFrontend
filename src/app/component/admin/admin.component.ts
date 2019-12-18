import { Component } from '@angular/core';
import { AdminApi } from 'src/app/api/admin.api';
import { UserModel } from 'src/app/model/user.model';
import { AllUsersModel } from 'src/app/model/all-users.model';
import { LogoutApi } from 'src/app/api/logout.api';
import { LogoutResponseModel } from 'src/app/model/logout-response.model';
import { Router } from '@angular/router';
import { PlantApi } from 'src/app/api/plant.api';
import { PlantModel } from 'src/app/model/plant.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: UserModel[] = Array<UserModel>();
  plants: PlantModel[] = Array<PlantModel>();
  deleteAccountPopUpIsActive: boolean = false;
  deletePlantPopUpIsActive: boolean = false;
  currentSelectedPage: string = "Accounts";
  currentSelectedUser: UserModel;
  currentSelectedPlant: PlantModel;
  currentSelectedReplacementPlant: PlantModel;

  constructor(private adminApi: AdminApi, private logoutApi: LogoutApi, private plantApi: PlantApi, private router: Router) {
    this.getAllNonAdminUsers();
    this.getAllPlants();
  }

  private getAllNonAdminUsers(): void {
    this.adminApi.getAllNonAdminUsers().then(response => this.handleGetAllNonAdminUsersResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleGetAllNonAdminUsersResponse(response: AllUsersModel): void {
    this.initUsers(response);
  }

  private getAllPlants(): void {
    this.plantApi.getAllPlants().then(response => this.handleGetAllPlantsResponse(response))
    .catch(exception => this.handleException(exception));
  }

  private handleGetAllPlantsResponse(response: PlantResponseModel) {
    for (let plant of response.plants) {
      this.plants.push(plant);
    }
  }

  showDeletePopUp(user: UserModel): void {
    this.currentSelectedUser = user;
    this.deleteAccountPopUpIsActive = true;
  }

  closeDeletePopUp(): void {
    this.currentSelectedUser = null;
    this.deleteAccountPopUpIsActive = false;
  }

  deleteUser(userID: number): void {
    this.adminApi.deleteUser(userID).then(response => this.handleDeleteUserResponse(response))
    .catch(exception => this.handleException(exception));
  }

  private handleDeleteUserResponse(response: AllUsersModel): void {
    this.users = Array<UserModel>();
    this.initUsers(response);
    this.closeDeletePopUp();
  }

  private initUsers(users: AllUsersModel): void {
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

  showDeletePlantPopUp(plant: PlantModel): void {
    this.currentSelectedPlant = plant;
    this.deletePlantPopUpIsActive = true;
  }

  closeDeletePlantPopUp(): void {
    this.currentSelectedPlant = null;
    this.currentSelectedReplacementPlant = null;
    this.deletePlantPopUpIsActive = false;
  }

  deletePlant(): void {
    this.plantApi.deletePlant(this.currentSelectedPlant.id, this.currentSelectedReplacementPlant.id)
      .then(response => this.handleDeletePlantResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleDeletePlantResponse(response: PlantResponseModel): void {
    this.plants = response.plants;
    this.closeDeletePlantPopUp();
  }
}
