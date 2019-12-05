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
import { AllPlotModel } from 'src/app/model/allplot.model';

@Component({
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  plants: PlantResponseModel;
  plots: PlotModel[][] = new Array<Array<PlotModel>>();
  plotId: number;
  price: number;
  inventory: InventoryModel;
  purchasePlot: boolean;
  FARM_SIZE_Y: number = 10;
  FARM_SIZE_X: number = 10;

  constructor(private inventoryApi: InventoryApi, private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi, private logoutApi: LogoutApi, private router: Router) {
    this.purchasePlot = false;
    this.generateGrassGrid();
    this.getFarm();
    this.getInventory();
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

  private handleFarmResponse(response: FarmModel): void {
    CurrentFarmModel.setFarmID(response.farmID);
		CurrentFarmModel.setOwnerID(response.ownerID);
		CurrentFarmModel.setPlots(response.plots);
    this.initPlots();
  }

  private initPlots(): void {
    for(let plot of CurrentFarmModel.plots) {
      this.plots[plot.y][plot.x] = plot;
    }
  }

  private generateGrassGrid(): void {
    for(let i=0;i<this.FARM_SIZE_Y;i++) {
      let row:PlotModel[]  = new Array<PlotModel>();
      for(let j=0;j<this.FARM_SIZE_X;j++) {
        row.push(new PlotModel(-1, j+1, i+1, 0, 0, 0, 0, false));
      }
      this.plots.push(row);
    }
  }

  handlePlotClick(plot: PlotModel): void {
    let WATERUSAGE_NUMBER = 1;
    let NAME = "0";
    let GROWINGTIME: number = 1;
    let PURCHASE_PRICE: number = 50;
    let PROFIT: number = 100;
    let AGE: number = 1000;
    let plant = new PlantModel(WATERUSAGE_NUMBER, NAME, GROWINGTIME, plot.plantID, PURCHASE_PRICE, PROFIT, AGE);
    this.plotId = plot.ID

    if(!plot.purchased) {
      this.price = plot.price;
      this.purchasePlot = true;
      return;
    }

    switch (plot.plantID) {
      case 0:
          this.plantApi.getAllPlants().then(plants => this.handlePlantsResponse(plants)).catch(any => this.handleException(any));
          break;
      default:
          this.plotApi.harvest(plot.ID, plant).then(plot => this.handlePlotResponse(plot)).catch(any => this.handlePlotResponse(any));
        break;
      }
  }

  private handlePlantsResponse(plants: PlantResponseModel): void {
    this.plants = plants;
  }

  placePlantOnPlot(plotId: number, plant: PlantModel): void {
    this.plotApi.placePlantOnPlot(plotId, plant).then(plant => this.handlePlotResponse(plant))
      .catch(any => this.handleException(any));
  }

  private handlePlotResponse(response: any): void {
    this.purchasePlot = false;
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

  closePlotModal(): void{
    this.purchasePlot = false;
  }

  callPurchasePlot(id: number): void{
    this.plotApi.purchasePlot(id).then(response => this.handlePlotResponse(response))
      .catch(exception => this.handleException(exception));
  }
}
