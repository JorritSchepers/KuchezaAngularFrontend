import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FarmApi } from 'src/app/api/farm.api';
import { PlantApi } from 'src/app/api/plant.api';
import { PlotApi } from 'src/app/api/plot.api';
import { PlotModel } from 'src/app/model/plot.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';
import { CurrentFarmModel } from 'src/app/model/current-farm.model';
import { LogoutResponseModel } from 'src/app/model/logout-response.model';
import { FarmModel } from 'src/app/model/farm.model';
import { LogoutApi } from 'src/app/api/logout.api';
import { InventoryApi } from 'src/app/api/inventory.api';
import { InventoryModel } from 'src/app/model/inventory.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})

export class FarmComponent {
  FARM_SIZE_Y: number = 10;
  FARM_SIZE_X: number = 10;
  WIDTH: number;
  HEIGHT: number;
  plants: PlantResponseModel;
  plots: PlotModel[][] = new Array<Array<PlotModel>>();
  plotId: number;
  price: number;
  inventory: InventoryModel;
  purchasePlot: boolean;
  wantToGiveWater: boolean;
  mySubscription: Subscription;
  plantTypes: PlantModel[];

  GROWDELAY: number = 2000;
  WATERDELAY: number = 10000;
  WATERPLANTAMOUNT: number = 20;

  constructor(private inventoryApi: InventoryApi, private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi, private logoutApi: LogoutApi, private router: Router) {
    this.prepareFarm();
  }

  private getInventory(): void {
    this.inventoryApi.getInventory().then(response => this.handleInventoryResponse(response));
  }

  private handleInventoryResponse(response: InventoryModel): void{
    this.inventory = response;
  }

  private getFarm(): void {
    this.farmApi.getFarm().then(response => this.handleFarmResponse(response))
      .catch(any => this.handleException(any));
  }

  private prepareFarm(): void {
    this.farmApi.getFarm().then(response => this.preparePlots(response))
      .catch(any => this.handleException(any));
  }

  private handleFarmResponse(response: FarmModel): void {
    CurrentFarmModel.setFarmID(response.farmID);
		CurrentFarmModel.setOwnerID(response.ownerID);
    CurrentFarmModel.setPlots(response.plots);
    this.initPlots();
  }

  private preparePlots(response: FarmModel): void {
    this.purchasePlot = false;
    this.wantToGiveWater = false;
    CurrentFarmModel.setWIDTH(response.WIDTH);
    CurrentFarmModel.setHEIGHT(response.HEIGHT);
    this.createGrid(CurrentFarmModel.WIDTH,CurrentFarmModel.HEIGHT);
    CurrentFarmModel.setFarmID(response.farmID);
		CurrentFarmModel.setOwnerID(response.ownerID);
    CurrentFarmModel.setPlots(response.plots);
    this.initPlots();
    this.getInventory();

    setInterval(this.growPlants,this.GROWDELAY,this);
    setInterval(this.useWater,this.WATERDELAY,this);
    this.plantApi.getAllPlants().then(plants => this.getAllPlantTypes(plants))
          .catch(any => this.handleException(any));
  }

  private initPlots(): void {
    for(let plot of CurrentFarmModel.plots) {
      plot.growTime = this.plots[plot.y][plot.x].growTime;
      this.plots[plot.y][plot.x] = plot;
      this.plots[plot.y][plot.x].initImage();
    }
  }

  private createGrid(WIDTH:number, HEIGHT:number): void {
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    for(let i=0;i<this.HEIGHT;i++) {
      let row:PlotModel[]  = new Array<PlotModel>();
      for(let j=0;j<this.WIDTH;j++) {
        row.push(new PlotModel(-1, j+1, i+1, 0, 0, 0, 0, false, 0,0));
      }
      this.plots.push(row);
    }
  }

  handlePlotClick(plot: PlotModel): void {
    this.plotId = plot.ID;

    if(!plot.purchased) {
      this.openPlotShop(plot.price);
    } else if (plot.waterManagerID !=0){
        this.gatherWater();
    } else if(plot.plantID == 0){
        this.openPlantShop();
    } else if(this.wantToGiveWater){
          this.givePlantWater(plot);
    } else {
        this.harvestPlantFromPlot(plot,plot.plantID);
    }
}

  private givePlantWater(plot: PlotModel){
    this.plotApi.editWater(plot.ID, this.WATERPLANTAMOUNT).then(plot => this.handlePlotResponse(plot))
      .catch(any => this.handleException(any));
  }

  private gatherWater(){
      this.wantToGiveWater = true;
  }

  private openPlantShop(){
    this.plantApi.getAllPlants().then(plants => this.handlePlantsResponse(plants))
      .catch(any => this.handleException(any));
  }

  private harvestPlantFromPlot(plot: PlotModel,plantID: number): void{
    let plant = new PlantModel(1,"0",1,plantID,50,100,1000);
    this.plotApi.oogst(plot.ID, plot).then(plot => this.handlePlotResponse(plot))
      .catch(any => this.handlePlotResponse(any));
  }

  private openPlotShop(plotprice: number): void{
    this.plants = new PlantResponseModel([]);
    this.price = plotprice;
    this.purchasePlot = true;
  }

  private handlePlantsResponse(plants: PlantResponseModel): void {
    this.plants = plants;
  }

  placePlantOnPlot(plotId: number, plant: PlantModel): void {
    this.plotApi.placePlantOnPlot(plotId, plant).then(plant => this.handlePlotResponse(plant))
      .catch(any => this.handleException(any));
  }

  private handlePlotResponse(response: any): void {
    this.plants = new PlantResponseModel([]);
    this.purchasePlot = false;
    this.wantToGiveWater = false;
    this.closeShop();
    this.getFarm();
    this.initPlots();
    this.getInventory();
  }

  logout(): void {
    this.logoutApi.logout().then(response => this.handleLogoutResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleLogoutResponse(response: LogoutResponseModel): void {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

  private closeShop(): void {
    this.plants = new PlantResponseModel([]);
  }

  private handleException(exception: any): void {
    console.warn("Exception:", exception);
  }

  timerActive(): boolean {
    return (window.location.href.includes("farm") && localStorage.hasOwnProperty('currentUser'))
  }

  private growPlants(farm: FarmComponent): void {
    if(farm.timerActive()) {
      if(farm.WIDTH != null) {
        for(let i=0;i<farm.HEIGHT;i++) {
          for(let j=0;j<farm.WIDTH;j++) {
            if(farm.plots[i][j].plantID > 0) {
              farm.plotApi.updateAge(farm.plots[i][j].age+2,farm.plots[i][j]);
              farm.plots[i][j].age += 2;
              farm.plots[i][j].updatePlantState(farm.getGrowTime(farm.plots[i][j].plantID));
            }
          }
        }
      }
    }
  }

  private useWater(farm: FarmComponent): void {
    if(farm.timerActive()) {
      if(farm.WIDTH != null) {
        for(let i=0;i<farm.HEIGHT;i++) {
          for(let j=0;j<farm.WIDTH;j++) {
            if(farm.plots[i][j].plantID > 0) {
              let waterUsage = farm.getWaterUsage(farm.plots[i][j].plantID)

              if(waterUsage < farm.plots[i][j].waterAvailable) {
                farm.plots[i][j].waterAvailable -= waterUsage
                farm.plotApi.editWater(farm.plots[i][j].ID,-Math.ceil(waterUsage))
              } else {
                farm.plots[i][j].waterAvailable = 0
                farm.plotApi.editWater(farm.plots[i][j].ID,-Math.ceil(waterUsage))
              }
            }
          }
        }
      }
    }
  }

  private getAllPlantTypes(plants: PlantResponseModel): void {
    this.plantTypes = plants.plants;
  }

  public getGrowTime(plantID:number): any {
    for(let plantType of this.plantTypes) {
        if(plantType.ID == plantID) {
          return plantType.growingTime;
        }
    }
    return 0;
  }

  public getWaterUsage(plantID:number): any {
    for(let plantType of this.plantTypes) {
        if(plantType.ID == plantID) {
          return plantType.waterUsage;
        }
    }
    return 0;
  }

  closePlotModal(): void{
    this.purchasePlot = false;
  }

  callPurchasePlot(id: number): void{
    this.plotApi.purchasePlot(id).then(response => this.handlePlotResponse(response))
      .catch(exception => this.handleException(exception));
  }
}
