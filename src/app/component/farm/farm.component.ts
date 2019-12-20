import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { InventoryApi } from 'src/app/api/inventory.api';
import { LogoutApi } from 'src/app/api/logout.api';
import { FarmApi } from 'src/app/api/farm.api';
import { PlantApi } from 'src/app/api/plant.api';
import { PlotApi } from 'src/app/api/plot.api';

import { PlotModel } from 'src/app/model/plot.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';
import { CurrentFarmModel } from 'src/app/model/current-farm.model';
import { LogoutResponseModel } from 'src/app/model/logout-response.model';
import { FarmModel } from 'src/app/model/farm.model';
import { InventoryModel } from 'src/app/model/inventory.model';
import { AnimalResponseModel } from 'src/app/model/animal-response.model';
import { AnimalModel } from 'src/app/model/animal.model';
import { AnimalApi } from 'src/app/api/animal.api';

const PLOTTIMERDELAY: number = 2000;
const WATERDELAY: number = 10000;
const WATERPLANTAMOUNT: number = 20;
const DEHYDRATED_FACTOR: number = 4;
const MAXIMUM_WATER: number = 500;

@Component({
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  private width: number;
  private height: number;
  private plants: PlantResponseModel;
  private plots: PlotModel[][] = new Array<Array<PlotModel>>();
  private plotId: number;
  private activePlot: PlotModel;
  private plotPrice: number;
  private inventory: InventoryModel = new InventoryModel(0, 0, 0);
  private purchasePlot: boolean;
  private wantToGiveWater: boolean;
  private harvestModal: boolean;
  private sellProductModal: boolean;
  private plantTypes: PlantModel[];
  private animalTypes: AnimalModel[];
  private activeAnimalId: number;
  private animals: AnimalResponseModel;
  private showPlantshop: Boolean;
  private showAnimalshop: Boolean;
  private showBuildingshop: Boolean;
  private purchasePlant: PlantModel;
  private purchaseAnimal: AnimalModel;
  private wantToPurchase: Boolean;
  private harvestPopUpText: String;

  private growTimer: any;
  private waterTimer: any;

  constructor(private animalApi: AnimalApi, private cookieService: CookieService,private inventoryApi: InventoryApi, private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi, private logoutApi: LogoutApi) {
    this.prepareFarm();
    this.resetVariables();
  }

  resetPurchaseId():void {
    this.purchasePlant = null;
    this.purchaseAnimal = null;
    this.wantToPurchase = false;
  }

  private handleInventoryResponse(response: InventoryModel): void{
    this.inventory = response;
    this.updateWater();
  }

  updateWater() {
    let water = document.getElementsByClassName("waterLevel")[0];
    let width = this.inventory.water/MAXIMUM_WATER;
    if(width > 1) {
      width = 1;
    }
    let cssString = "width: "+width*19.8+"vh;";

    if(width >= 0.92) {
      cssString += "border-radius: 20vh;"
    }

    water.setAttribute("style", cssString);
  }

  prepareFarm(): void {
    this.farmApi.getFarm().then(response => this.preparePlots(response))
      .catch(any => this.handleException(any));
  }

  private handleFarmResponse(response: FarmModel): void {
    CurrentFarmModel.setFarmID(response.farmID);
		CurrentFarmModel.setOwnerID(response.ownerID);
    CurrentFarmModel.setPlots(response.plots);
    this.initPlots();
  }

  resetVariables(){
    this.purchasePlot = false;
    this.wantToGiveWater = false;
    this.harvestModal = false;
    this.showPlantshop = false;
    this.showAnimalshop = false;
    this.wantToPurchase = false;
  }

  setTimers(){
    if(this.growTimer != null) {
      clearInterval(this.growTimer);
      this.growTimer = null;
    }
    if(this.waterTimer != null) {
      clearInterval(this.waterTimer);
      this.waterTimer = null;
    }

    this.growTimer = setInterval(this.updateObjectAge,PLOTTIMERDELAY,this);
    this.waterTimer = setInterval(this.useWater,WATERDELAY,this);
  }

  preparePlots(response: FarmModel): void {
    CurrentFarmModel.setWidth(response.WIDTH);
    CurrentFarmModel.setHeight(response.HEIGHT);
    this.createGrid(CurrentFarmModel.width,CurrentFarmModel.height);

    CurrentFarmModel.setFarmID(response.farmID);
    CurrentFarmModel.setOwnerID(response.ownerID);
    CurrentFarmModel.setPlots(response.plots);

    this.initPlots();
    this.getInventory();
    this.getAllAnimals();

    this.setTimers();

    this.getAllPlants();
  }

  initPlots(): void {
    for(let plot of CurrentFarmModel.plots) {
      plot.harvestTime = this.plots[plot.y][plot.x].harvestTime;
      this.plots[plot.y][plot.x] = plot;
      this.plots[plot.y][plot.x].initImage();
    }
  }

  private createGrid(width: number, height: number): void {
    this.width = width;
    this.height = height;
    for(let i=0;i<this.height;i++) {
      let row:PlotModel[]  = new Array<PlotModel>();
      for(let j=0;j<this.width;j++) {
        row.push(new PlotModel(-1, j+1, i+1, 0, 0, 0, 0, false, 0,0,""));
      }
      this.plots.push(row);
    }
  }

  private handleAnimalsResponse(animals: AnimalResponseModel): void {
    this.animals = animals;
    this.getAllAnimalTypes(animals);
  }

  private handlePlotClick(plot: PlotModel): void {
    this.plotId = plot.id;

    if(!plot.purchased) {
      this.openPlotShop(plot.price);
    } else if (plot.waterManagerID !=0){
        this.gatherWater();
    } else if(this.wantToPurchase){
        this.handlePurchase();
    } else if(this.wantToGiveWater){
        this.givePlantWater(plot);
    } else if(plot.plantID > 0 && plot.harvestable == true && plot.status == "Normal") {
        this.activePlot = plot;
        this.harvestPopUpText = null;
        this.openHarvestModel();
    } else if(plot.plantID > 0 && plot.harvestable == true && plot.status == "Dehydrated") {
      this.activePlot = plot;
      this.harvestPopUpText = "This plant is dehydrated!"
      this.openHarvestModel();
    } else if(plot.plantID > 0 && plot.status == "Dead") {
      this.activePlot = plot;
      this.harvestPopUpText = "This plant is dead!"
      this.openHarvestModel();
    } else if(plot.animalID > 0 && plot.harvestable == true) {
      this.activePlot = plot;
      this.openSellProductModel();
    }
}

  harvestPlantFromPlot(): void{
    this.harvestModal = false;
    this.plotApi.harvest(this.activePlot.id, this.activePlot).then(plot => this.handlePlotResponse(plot))
      .catch(any => this.handlePlotResponse(any));
  }

  givePlantWater(plot: PlotModel){
    this.plotApi.editWater(plot.id, WATERPLANTAMOUNT).then(plot => this.handlePlotResponse(plot))
      .catch(any => this.handleException(any));
  }

  sellProductFromPlot(): void{
    this.sellProductModal = false;
    this.plotApi.sellProduct(this.activePlot.id, this.activePlot).then(plot => this.handlePlotResponse(plot))
      .catch(any => this.handlePlotResponse(any));
  }

  toggleBuildingShop(){
    this.showBuildingshop = (!this.showBuildingshop);
    this.showAnimalshop = false;
    this.showPlantshop = false;
  }

  toggleAnimalShop(){
    this.showAnimalshop = (!this.showAnimalshop);
    this.showPlantshop = false;
    this.showBuildingshop = false;
  }

  gatherWater(){
      this.wantToGiveWater = true;
  }

  togglePlantShop(){
    this.showPlantshop = (!this.showPlantshop);
    this.showAnimalshop = false;
    this.showBuildingshop = false;
  }

  openPlotShop(plotprice: number): void{
    this.plotPrice = plotprice;
    this.purchasePlot = true;
  }

  private handlePlantsResponse(plants: PlantResponseModel): void {
    this.plants = plants;
    this.getAllPlantTypes(plants);
  }

  private handlePlotResponse(response: any): void {
    this.purchasePlot = false;
    this.wantToGiveWater = false;
    this.prepareFarm();
    this.initPlots();
    this.getInventory();
    this.resetPurchaseId();
  }

  logout(): void {
    this.logoutApi.logout().then(response => this.handleLogoutResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleLogoutResponse(response: LogoutResponseModel): void {
    window.location.pathname = '/login'
  }

  private handleException(exception: any): void {
    console.warn(exception.error);
  }

  timerActive(): boolean {
    return (window.location.href.includes("farm") && this.cookieService.get('currentUser') && this.width != null && this.height != null)
  }

  private updateObjectAge(farm: FarmComponent): void {
    if(farm.timerActive()) {
      for(let i=0;i<farm.height;i++) {
        for(let j=0;j<farm.width;j++) {
          let plot = farm.plots[i][j];
          if(plot.plantID > 0 && plot.status != "Dead") {
            plot.harvestTime = farm.getGrowTime(plot.plantID);
            farm.plotApi.updateAge(plot.age+PLOTTIMERDELAY/1000,plot);
            plot.age += PLOTTIMERDELAY/1000;
            if(plot.status == "Dehydrated") {
              plot.setDehydrathedPlant();
            } else {
              plot.setNormalPlant();
            }
          } else if(plot.animalID > 0) {
            plot.harvestTime = farm.getProductionTime(plot.animalID);
            farm.plotApi.updateAge(plot.age+PLOTTIMERDELAY/1000,plot);
            plot.age += PLOTTIMERDELAY/1000;
            if(plot.age >= plot.harvestTime) {
              plot.harvestable = true;
              plot.setAnimalImage();
            }
          }
        }
      }
    }
  }

  useWater(farm: FarmComponent): void {
    if(farm.timerActive()) {
      for(let i=0;i<farm.height;i++) {
        for(let j=0;j<farm.width;j++) {
          let plot = farm.plots[i][j];
          if(plot.plantID > 0) {
            let waterUsage = farm.getWaterUsage(plot.plantID);
            if(plot.status == "Normal") {
              farm.normalPlantAction(plot,waterUsage,farm);
            } else if(plot.status == "Dehydrated") {
              farm.dehydratedPlantAction(plot,waterUsage,farm);
            }
          }
        }
      }
    }
  }

  dehydratePlant(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage));
    farm.plotApi.updateStatus(plot.id,"Dehydrated");
    plot.status = "Dehydrated";
    plot.setDehydrathedPlant();
  }

  dehydratedPlantAction(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    let maximumWater = farm.getMaximumWater(plot.plantID);

    //REMOVE WATER
    plot.waterAvailable -= waterUsage;
    farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage));

    //KILL IS WATER IS EMPTY
    if(plot.waterAvailable <= 0) {
      plot.waterAvailable = 0;
      farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage));
      farm.plotApi.updateStatus(plot.id,"Dead");
      plot.status = "Dead";
      plot.setDeadPlant();
    }

    //RESTORE IF WATER IS HIGH ENOUGH
    if(plot.waterAvailable > maximumWater/DEHYDRATED_FACTOR) {
      plot.status = "Normal";
    }
  }

  normalPlantAction(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    //REMOVE WATER
    plot.waterAvailable -= waterUsage;
    farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage));

    //DEHYDRATE PLANT IF WATER IS TOO LOW
    if (plot.waterAvailable <= farm.getMaximumWater(plot.plantID)/DEHYDRATED_FACTOR) {
      farm.dehydratePlant(plot,waterUsage,farm);
    }
  }

  callPurchasePlot(id: number): void{
    this.plotApi.purchasePlot(id).then(response => this.handlePlotResponse(response))
      .catch(exception => this.handleException(exception));
  }

  openHarvestModel(): void{
    this.harvestModal = true;
  }

  closeHarvestModal(): void{
    this.harvestModal = false;
  }

  openSellProductModel(): void{
    this.sellProductModal = true;
  }

  closeSellProductModal(): void{
    this.sellProductModal = false;
  }

  closePlotModal(): void{
    this.purchasePlot = false;
  }

  getAllPlantTypes(plants: PlantResponseModel): void {
    this.plantTypes = this.plants.plants;
  }

  getAllAnimalTypes(animals: AnimalResponseModel): void {
    this.animalTypes = this.animals.animals;
  }

  getGrowTime(plantID:number): number {
    for(let plantType of this.plantTypes) {
        if(plantType.id == plantID) {
          return plantType.growingTime;
        }
    }
    return 0;
  }

  getProductionTime(animalID:number): number {
    for(let animalType of this.animalTypes) {
        if(animalType.id == animalID) {
          return animalType.productionTime;
        }
    }
    return 0;
  }

  getWaterUsage(plantID:number): number {
      for(let plantType of this.plantTypes) {
          if(plantType.id == plantID) {
            return plantType.waterUsage;
          }
      }
      return 0;
    }

  getMaximumWater(plantID:number): number {
      for(let plantType of this.plantTypes) {
        if(plantType.id == plantID) {
          return plantType.maximumWater;
        }
    }
    return 0;
  }

  getInventory(): void {
      this.inventoryApi.getInventory().then(response => this.handleInventoryResponse(response));
  }

  getAllPlants(){
    this.plantApi.getAllPlants().then(plants => this.handlePlantsResponse(plants))
      .catch(any => this.handleException(any));
  }

  getAllAnimals(){
    this.animalApi.getAllAnimals().then(animals => this.handleAnimalsResponse(animals))
      .catch(any => this.handleException(any));
  }

  setpurchasePlant(plant: PlantModel): void{
      this.purchaseAnimal = null;
      this.wantToPurchase = true;
      this.purchasePlant = plant;
      this.showPlantshop = false;
  }

  setpurchaseAnimal(animal: AnimalModel): void{
      this.purchaseAnimal = animal;
      this.purchasePlant = null;
      this.wantToPurchase = true;
      this.showAnimalshop = false;
  }

  private handlePurchase(): void{
    if(this.purchasePlant){
      this.plotApi.placePlantOnPlot(this.plotId,this.purchasePlant).then(plant => this.handlePlotResponse(plant))
        .catch(any => this.handleException(any));
    }
    else if(this.purchaseAnimal){
      this.plotApi.placeAnimalOnPlot(this.plotId, this.purchaseAnimal).then(animal => this.handlePlotResponse(animal))
        .catch(any => this.handleException(any));
    }
  }
}
