import { Component } from '@angular/core';
import { AdminApi } from 'src/app/api/admin.api';
import { UserModel } from 'src/app/model/user.model';
import { AllUsersModel } from 'src/app/model/all-users.model';
import { LogoutApi } from 'src/app/api/logout.api';
import { LogoutResponseModel } from 'src/app/model/logout-response.model';
import { PlantApi } from 'src/app/api/plant.api';
import { PlantModel } from 'src/app/model/plant.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { AnimalApi } from 'src/app/api/animal.api';
import { AnimalResponseModel } from 'src/app/model/animal-response.model';
import { AnimalModel } from 'src/app/model/animal.model';

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
  animals: AnimalResponseModel;
  currentSelectedAnimal: AnimalModel;
  deleteAnimalPopUpIsActive = false;
  currentSelectedReplacementAnimal: AnimalModel = null;

  constructor(private animalApi: AnimalApi,private adminApi: AdminApi, private logoutApi: LogoutApi, private plantApi: PlantApi) {
    this.getAllNonAdminUsers();
    this.getAllPlants();
    this.getAllAnimals();
  }

  getAllNonAdminUsers(): void {
    this.adminApi.getAllNonAdminUsers().then(response => this.handleGetAllNonAdminUsersResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleGetAllNonAdminUsersResponse(response: AllUsersModel): void {
    this.initUsers(response);
  }

  getAllPlants(): void {
    this.plantApi.getAllPlants().then(response => this.handleGetAllPlantsResponse(response))
    .catch(exception => this.handleException(exception));
  }

  private handleGetAllPlantsResponse(response: PlantResponseModel) {
    for (let plant of response.plants) {
      this.plants.push(plant);
    }
  }

  getAllAnimals(){
   this.animalApi.getAllAnimals().then(animals => this.handleAnimalsResponse(animals))
     .catch(any => this.handleException(any));
  }

  showDeleteAnimalPopUp(animal: AnimalModel): void {
    this.currentSelectedAnimal = animal;
    this.deleteAnimalPopUpIsActive = true;
  }

  closeDeleteAnimalPopUp(): void{
    this.currentSelectedAnimal = null;
    this.currentSelectedReplacementAnimal = null;
    this.deleteAnimalPopUpIsActive = false;
  }

  deleteAnimal():void{
    this.animalApi.deleteAnimal(this.currentSelectedAnimal.id, this.currentSelectedReplacementAnimal.id)
      .then(response => this.handleDeleteAnimalResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleDeleteAnimalResponse(response: AnimalResponseModel): void {
    this.animals = response;
    this.closeDeleteAnimalPopUp();
  }

  private handleAnimalsResponse(animals: AnimalResponseModel): void {
     this.animals = animals;
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

  initUsers(users: AllUsersModel): void {
    for (let user of users.users) {
      this.users.push(user);
    }
  }

  private handleException(exception: any): void {
    console.warn(exception);
  }

  private logout(): void {
    this.logoutApi.logout().then(response => this.handleLogoutResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleLogoutResponse(response: LogoutResponseModel): void {
    localStorage.removeItem('currentUser');
    window.location.pathname = '/login';
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
