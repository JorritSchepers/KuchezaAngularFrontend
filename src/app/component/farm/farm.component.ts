import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { InventoryApi } from 'src/app/api/inventory.api';
import { LogoutApi } from 'src/app/api/logout.api';
import { FarmApi } from 'src/app/api/farm.api';
import { PlantApi } from 'src/app/api/plant.api';
import { PlotApi } from 'src/app/api/plot.api';
import { BuildingApi } from 'src/app/api/building.api';

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
import { WaterSourceModel } from 'src/app/model/watersource.model';
import { WaterSourceResponseModel } from 'src/app/model/watersource-response.model';
import { Title } from "@angular/platform-browser";

const PLOTTIMERDELAY: number = 5000;
const WATERDELAY: number = 5000;
const WATERPLANTAMOUNT: number = 1250;
const DEHYDRATED_FACTOR: number = 6;
const MAXIMUM_WATER: number = 50000000;

@Component({
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  private width: number;
  private height: number;
  plants: PlantResponseModel;
  plots: PlotModel[][] = new Array<Array<PlotModel>>();
  plotId: number;
  activePlot: PlotModel;
  plotPrice: number;
  inventory: InventoryModel = new InventoryModel(0, 0, 0);
  purchasePlot: boolean;
  wantToGiveWater: boolean;
  gameplayLoopEnd: boolean;
  harvestModal: boolean;
  animalRemoveModal: boolean;
  sellProductModal: boolean;
  plantTypes: PlantModel[];
  waterSourceTypes: WaterSourceModel[];
  private animalTypes: AnimalModel[];
  private activeAnimalId: number;
  animals: AnimalResponseModel;
  showPlantshop: Boolean;
  showAnimalshop: Boolean;
  showBuildingshop: Boolean;
  purchasePlant: PlantModel;
  purchaseAnimal: AnimalModel;
  wantToPurchase: Boolean;
  harvestPopUpText: String;
  private growTimer: any;
  private waterTimer: any;
  animalAudio: any;
  inGameMusic: any;

  constructor(private titleService:Title,private animalApi: AnimalApi, private cookieService: CookieService,private inventoryApi: InventoryApi, private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi, private logoutApi: LogoutApi, private buildingApi: BuildingApi) {
    this.prepareFarm();
    this.resetVariables();
    this.inGameMusic = new Audio();
    this.animalAudio = new Audio();
    this.titleService.setTitle("Kucheza");
  }

  playInGameMusic():void {
    if(this.inGameMusic.paused) {
      this.inGameMusic.src = "../assets/audio/Main_In_Game_Music.wav";
      this.inGameMusic.load();
      this.inGameMusic.loop = true;
      this.inGameMusic.play();
    }
  }

  playAnimalSound(animalId: number):void {
    if(this.animalAudio.paused) {
      if(animalId == 1) {
        this.animalAudio.src = "../assets/audio/Cow_Sound.wav";
      } else if(animalId == 2) {
        this.animalAudio.src = "../assets/audio/Chicken_Sound.mp3";
      } else {
        this.animalAudio.src = "../assets/audio/Goat_Sound.wav";
      }
      this.animalAudio.load();
      this.animalAudio.play();
    }
  }

  resetPurchaseId():void {
    this.purchasePlant = null;
    this.purchaseAnimal = null;
    this.wantToPurchase = false;
  }

  private handleInventoryResponse(response: InventoryModel): void{
    this.inventory = response;
    this.updateWater();
    this.callGameplayLoopEnd();
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
    this.gameplayLoopEnd = false;
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
    this.getWaterSources();

    this.setTimers();

    this.getAllPlants();

    this.setMaximumWaterForPlots();
    this.playInGameMusic();
  }

  initPlots(): void {
    for(let plot of CurrentFarmModel.plots) {
      plot.harvestTime = this.plots[plot.y][plot.x].harvestTime;
      this.plots[plot.y][plot.x] = plot;
      this.plots[plot.y][plot.x].initImage();
    }
  }

  createGrid(width: number, height: number): void {
    this.width = width;
    this.height = height;
    for(let i=0;i<this.height;i++) {
      let row:PlotModel[]  = new Array<PlotModel>();
      for(let j=0;j<this.width;j++) {
        row.push(new PlotModel(-1, j+1, i+1, 0, 0, 0,0, 0, false, 0,0,""));
      }
      this.plots.push(row);
    }
  }

  private handleAnimalsResponse(animals: AnimalResponseModel): void {
    this.animals = animals;
    this.getAllAnimalTypes(animals);
  }

  handlePlotClick(plot: PlotModel): void {
    this.plotId = plot.id;

    if(!plot.purchased) {
      this.openPlotShop(plot.price);
    } else if (plot.waterManagerID != 0){
      this.gatherWater();
    } else if(this.wantToPurchase){
      this.handlePurchase();
    } else if(this.wantToGiveWater && (plot.plantID != 0 || plot.animalID != 0)){
      this.giveWater(plot);
      plot.updateWater(true);
    } else if(plot.plantID != 0) {
      this.handlePlantClick(plot);
    } else if(plot.waterSourceID != 0) {
      this.handleWaterSourceClick(plot);
    } else if(plot.animalID != 0) {
      this.handleAnimalClick(plot);
    }
  }

  handleAnimalClick(plot: PlotModel) {
    switch(plot.status) {
      case "Normal": {
        if(plot.harvestable == true) {
          this.activePlot = plot;
          this.openSellProductModel();
        }
        this.playAnimalSound(plot.animalID);
        break;
      }
      case "Dehydrated": {
        this.harvestPopUpText = "This plant is dehydrated!";
        this.playAnimalSound(plot.animalID);
        break;
      }
      case "Dead": {
        this.activePlot = plot;
        this.openAnimalRemoveModel();
        break;
      }
    }
  }

  handleWaterSourceClick(plot: PlotModel) {
    this.plotApi.editWater(plot.id, -plot.waterAvailable, false);
    this.inventoryApi.editInventoryWater(plot.waterAvailable).then(response => this.handleInventoryResponse(response));
    plot.waterAvailable = 0;
    plot.maximumWater = this.getMaximumSourceWater(plot.waterSourceID);
    plot.updateWater(true);
  }

  handlePlantClick(plot: PlotModel) {
    if(plot.harvestable == true || plot.status == "Dead") {
      this.harvestPlantClick(plot);
    }
  }

  harvestPlantClick(plot: PlotModel) {
    switch(plot.status) {
      case "Normal": {
        this.harvestPopUpText = null;
        break;
      }
      case "Dehydrated": {
        this.harvestPopUpText = "This plant is dehydrated!";
        break;
      }
      case "Dead": {
        this.harvestPopUpText = "This plant is dead!";
        break;
      }
    }
    this.activePlot = plot;
    this.openHarvestModel();
  }

  harvestPlantFromPlot(): void{
    this.harvestModal = false;
    this.plotApi.harvest(this.activePlot.id, this.activePlot).then(plot => this.handlePlotResponse(plot))
      .catch(any => this.handlePlotResponse(any));
  }

  removeAnimalFromPlot(): void{
    this.animalRemoveModal = false;
    this.plotApi.remove(this.activePlot.id, this.activePlot).then(plot => this.handlePlotResponse(plot))
      .catch(any => this.handlePlotResponse(any));
  }

  private giveWater(plot: PlotModel){
    this.plotApi.editWater(plot.id, WATERPLANTAMOUNT, true).then(plot => this.handlePlotResponse(plot))
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

  private getWaterSources(): void {
    this.buildingApi.getAllWaterSources().then(response => this.handleWaterSourceResponse(response))
    .catch(exception => this.handleException(exception));
  }

  private handleWaterSourceResponse(waterSources: WaterSourceResponseModel): void {
    this.waterSourceTypes = waterSources.waterSources;
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
            farm.handlePlantWater(plot,farm);
          }

          if(plot.waterSourceID > 0) {
            farm.handleWaterSourceWater(plot, farm);
          }

          if(plot.animalID > 0) {
            farm.handleAnimalWater(plot, farm);
          }
        }
      }
    }
  }

  handlePlantWater(plot: PlotModel, farm: FarmComponent) {
    let waterUsage = farm.getWaterUsage(plot.plantID);
    if(plot.status == "Normal") {
      farm.normalPlantAction(plot,waterUsage,farm);
    } else if(plot.status == "Dehydrated") {
      farm.dehydratedPlantAction(plot,waterUsage,farm);
    }
    plot.maximumWater = farm.getMaximumWater(plot.plantID);
    plot.updateWater(true);
  }

  handleWaterSourceWater(plot: PlotModel, farm: FarmComponent) {
    let waterYield = farm.getWaterYield(plot.waterSourceID);
    plot.waterAvailable += waterYield;
    farm.plotApi.editWater(plot.id,Math.ceil(waterYield), false);
    plot.maximumWater = farm.getMaximumSourceWater(plot.waterSourceID);
    plot.updateWater(true);
  }

  handleAnimalWater(plot: PlotModel, farm : FarmComponent) {
    let waterUsage = farm.getAnimalWaterUsage(plot.animalID);
    if(plot.status == "Normal") {
      farm.normalAnimalAction(plot,waterUsage,farm);
    } else if(plot.status == "Dehydrated") {
      farm.dehydratedAnimalAction(plot,waterUsage,farm);
    }
    plot.maximumWater = farm.getMaximumAnimalWater(plot.animalID);
    plot.updateWater(true);
  }

  dehydratePlant(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    farm.plotApi.updateStatus(plot.id,"Dehydrated");
    plot.status = "Dehydrated";
    plot.setDehydrathedPlant();
  }

  dehydrateAnimal(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    farm.plotApi.updateStatus(plot.id,"Dehydrated");
    plot.status = "Dehydrated";
    plot.setAnimalImage();
  }

  dehydratedPlantAction(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    let maximumWater = farm.getMaximumWater(plot.plantID);

    //REMOVE WATER
    plot.waterAvailable -= waterUsage;
    farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage), false);

    //KILL IF WATER IS EMPTY
    if(plot.waterAvailable <= 0) {
      plot.waterAvailable = 0;
      farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage), false);
      farm.plotApi.updateStatus(plot.id,"Dead");
      plot.status = "Dead";
      plot.setDeadPlant();
    }

    //RESTORE IF WATER IS HIGH ENOUGH
    if(plot.waterAvailable > maximumWater/DEHYDRATED_FACTOR) {
      plot.status = "Normal";
    }
  }

  dehydratedAnimalAction(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    let maximumWater = farm.getMaximumAnimalWater(plot.animalID);

    //REMOVE WATER
    plot.waterAvailable -= waterUsage;
    farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage), false);

    //KILL IS WATER IF EMPTY
    if(plot.waterAvailable <= 0) {
      plot.waterAvailable = 0;
      farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage), false);
      farm.plotApi.updateStatus(plot.id,"Dead");
      plot.status = "Dead";
      plot.setAnimalImage();
    }

    //RESTORE IF WATER IS HIGH ENOUGH
    if(plot.waterAvailable > maximumWater/DEHYDRATED_FACTOR) {
      plot.status = "Normal";
      plot.setAnimalImage();
    }
  }

  normalPlantAction(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    //REMOVE WATER
    plot.waterAvailable -= waterUsage;
    farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage), false);

    //DEHYDRATE PLANT IF WATER IS TOO LOW
    if (plot.waterAvailable <= farm.getMaximumWater(plot.plantID)/DEHYDRATED_FACTOR) {
      farm.dehydratePlant(plot,waterUsage,farm);
    }
  }

  normalAnimalAction(plot: PlotModel, waterUsage: number, farm: FarmComponent): void {
    //REMOVE WATER
    plot.waterAvailable -= waterUsage;
    farm.plotApi.editWater(plot.id,-Math.ceil(waterUsage), false);

    //DEHYDRATE PLANT IF WATER IS TOO LOW
    if (plot.waterAvailable <= farm.getMaximumAnimalWater(plot.animalID)/DEHYDRATED_FACTOR) {
      farm.dehydrateAnimal(plot,waterUsage,farm);
    }
  }

  callGameplayLoopEnd(){
    if(this.inventory.water <= 0){
      this.openGameplayLoopEndModal();
    }
  }

  callPurchasePlot(id: number): void{
    this.plotApi.purchasePlot(id).then(response => this.handlePlotResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private openHarvestModel(): void{
    this.harvestModal = true;
  }

  closeHarvestModal(): void{
    this.harvestModal = false;
  }

  openAnimalRemoveModel(): void{
    this.animalRemoveModal = true;
  }

  closeAnimalRemoveModel(): void{
    this.animalRemoveModal = false;
  }

  private openSellProductModel(): void{
    this.sellProductModal = true;
  }

  closeSellProductModal(): void{
    this.sellProductModal = false;
  }

  closePlotModal(): void{
    this.purchasePlot = false;
  }

  private openGameplayLoopEndModal(): void{
    this.gameplayLoopEnd = true;
  }

  getAllPlantTypes(plants: PlantResponseModel): void {
    this.plantTypes = this.plants.plants;
  }

  getAllAnimalTypes(animals: AnimalResponseModel): void {
    this.animalTypes = this.animals.animals;
  }

  getGrowTime(plantId:number): number {
    for(let plantType of this.plantTypes) {
        if(plantType.id == plantId) {
          return plantType.growingTime;
        }
    }
    return 0;
  }

  getProductionTime(animalId:number): number {
    for(let animalType of this.animalTypes) {
        if(animalType.id == animalId) {
          return animalType.productionTime;
        }
    }
    return 0;
  }

  getWaterUsage(plantId:number): number {
    for(let plantType of this.plantTypes) {
        if(plantType.id == plantId) {
          return plantType.waterUsage;
        }
    }
    return 0;
  }

  getAnimalWaterUsage(animalId:number): number {
    for(let animal of this.animalTypes) {
        if(animal.id == animalId) {
          return animal.waterUsage;
        }
    }
    return 0;
  }

  getMaximumWater(plantId:number): number {
      for(let plantType of this.plantTypes) {
        if(plantType.id == plantId) {
          return plantType.maximumWater;
        }
    }
    return 0;
  }

  public getMaximumSourceWater(waterSourceID:number): number {
    for(let waterSource of this.waterSourceTypes) {
      if(waterSource.id == waterSourceID) {
        return waterSource.maximumWater;
      }
  }
  return 0;
}

  public getMaximumAnimalWater(animalID:number): number {
    for(let animal of this.animalTypes) {
      if(animal.id == animalID) {
        return animal.maximumWater;
      }
    }
    return 0;
  }

  public getWaterYield(waterSourceID:number): number {
    for(let waterSource of this.waterSourceTypes) {
        if(waterSource.id == waterSourceID) {
          return waterSource.waterYield;
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

  private setMaximumWaterForPlots(): void {
    for(let plotList of this.plots) {
      for(let plot of plotList) {
        if(plot.plantID > 0) {
          plot.maximumWater = this.getMaximumWater(plot.plantID);
          plot.updateWater(true);
        }

        if(plot.waterSourceID > 0) {
          plot.maximumWater = this.getMaximumSourceWater(plot.waterSourceID);
          plot.updateWater(true);
        }

        if(plot.animalID > 0) {
          plot.maximumWater = this.getMaximumAnimalWater(plot.animalID);
          plot.updateWater(true);
        }
      }
    }
  }

  private handlePurchase(): void{
    if(this.purchasePlant){
      this.plotApi.placePlantOnPlot(this.plotId,this.purchasePlant).then(plant => this.handlePlotResponse(plant))
        .catch(any => this.handleException(any));
    }
    else if(this.purchaseAnimal){
      this.plotApi.placeAnimalOnPlot(this.plotId, this.purchaseAnimal).then(animal => this.handlePlotResponse(animal))
        .catch(any => this.handleException(any));
        this.playAnimalSound(this.purchaseAnimal.id);
    }
  }
}
