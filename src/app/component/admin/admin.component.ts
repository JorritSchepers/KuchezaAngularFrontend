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
import { AllActionsModel } from 'src/app/model/all-actions.model';

const PLANTED_A_SEED_ACTION_ID = 1;
const HARVESTED_A_PLANT_ACTION_ID = 2;
const GAVE_A_PLANT_WATER_ACTION_ID = 3;
const BOUGHT_A_PLOT_ACTION_ID = 4;
const LOST_A_PLANT_ACTION_ID = 5;
const BOUGHT_AN_ANIMAL_ACTION_ID = 6;
const LOST_AN_ANIMAL_ACTION_ID = 7;
const SOLD_AN_ITEM_FROM_AN_ANIMAL_ACTION_ID = 8;

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
  showingStats: boolean = false;
  graph = null;
  currentAllActionsModel: AllActionsModel = null;

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

  showStats(user: UserModel): void {
    this.currentSelectedUser = user;
    this.graph = null;
    console.warn(this.currentSelectedUser);
    this.adminApi.getActionFromUser(this.currentSelectedUser.id)
      .then(response => this.handleActionsResponse(response))
      .catch(exception => this.handleException(exception));

    this.currentSelectedPage = "Stats";
    this.showingStats = true;    
  }

  private handleActionsResponse(response: AllActionsModel) {
    this.currentAllActionsModel = response;
    let dates: string[] = this.extractDates();
    let plantedASeed: number[] = this.extractData(dates, PLANTED_A_SEED_ACTION_ID);
    let harvestedAPlant: number[] = this.extractData(dates, HARVESTED_A_PLANT_ACTION_ID);
    let gaveAPlantWater: number[] = this.extractData(dates, GAVE_A_PLANT_WATER_ACTION_ID);
    let boughtAPlot: number[] = this.extractData(dates, BOUGHT_A_PLOT_ACTION_ID);
    let lostAPlant: number[] = this.extractData(dates, LOST_A_PLANT_ACTION_ID);
    let boughtAnAnimal: number[] = this.extractData(dates, BOUGHT_AN_ANIMAL_ACTION_ID);
    let lostAnAnimal: number[] = this.extractData(dates, LOST_AN_ANIMAL_ACTION_ID);
    let soldAnItemFromAnAnimal: number[] = this.extractData(dates, SOLD_AN_ITEM_FROM_AN_ANIMAL_ACTION_ID);

    this.graph = {
      data: [
          { x: dates, y: plantedASeed, name: 'Planted a seed', type: 'scatter', mode: 'lines+points', marker: {color: 'black'} },
          { x: dates, y: harvestedAPlant, name: 'Harvested a plant', type: 'scatter', mode: 'lines+points', marker: {color: 'green'} },
          { x: dates, y: gaveAPlantWater, name: 'Gave a plant water', type: 'scatter', mode: 'lines+points', marker: {color: 'blue'} },
          { x: dates, y: boughtAPlot, name: 'Bought a plot', type: 'scatter', mode: 'lines+points', marker: {color: 'cyan'} },
          { x: dates, y: lostAPlant, name: 'Lost a plant', type: 'scatter', mode: 'lines+points', marker: {color: 'purple'} },
          { x: dates, y: boughtAnAnimal, name: 'Bought an animal', type: 'scatter', mode: 'lines+points', marker: {color: 'orange'} },
          { x: dates, y: lostAnAnimal, name: 'Lost an animal', type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
          { x: dates, y: soldAnItemFromAnAnimal, name: 'Sold an item from an animal', type: 'scatter', mode: 'lines+points', marker: {color: 'yellow'} },
      ],
      layout: {width: 1400, height: 500, title: this.currentSelectedUser.name}
    };
  }

  private extractDates(): string[] {
    let tempList: string[] = Array<string>(); 
    tempList.push("" + this.currentAllActionsModel.actions[0].dateOfAction.date + "/" + this.currentAllActionsModel.actions[0].dateOfAction.month + "/" + (this.currentAllActionsModel.actions[0].dateOfAction.year+1900));
    for (let action of this.currentAllActionsModel.actions) {
      if (this.isDupeActionDate("" + action.dateOfAction.date + "/" + action.dateOfAction.month + "/" + (action.dateOfAction.year+1900), tempList)) continue;
      tempList.push("" + action.dateOfAction.date + "/" + action.dateOfAction.month + "/" + (action.dateOfAction.year+1900));
    }
    return tempList;
  }

  private isDupeActionDate(toBeChecked: string, list: string[]): boolean {
    for (let item of list) {
      if (toBeChecked == item) return true;
    }
    return false;
  }

  private extractData(dates: string[], actionId: number): number[] {
    let tempList: number[] = Array<number>(0); 
    for (let date of dates) {
      let total: number = 0;
      for (let action of this.currentAllActionsModel.actions) {
        if (action.actionID != actionId) continue;
        if (date != "" + action.dateOfAction.date + "/" + action.dateOfAction.month + "/" + (action.dateOfAction.year+1900)) continue;
        total++;
      }
      tempList.push(total);
    }
    return tempList;
  }
}
