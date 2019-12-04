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
import { interval, Subscription } from 'rxjs';

@Component({
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  plants: PlantResponseModel;
  plots: PlotModel[][] = new Array<Array<PlotModel>>();
  plotId: number;
  inventory: InventoryModel;

  mySubscription: Subscription;

  constructor(private inventoryApi: InventoryApi, private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi, private logoutApi: LogoutApi, private router: Router) {
    this.generateGrassGrid();
    this.getFarm();
    this.getInventory();
    this.mySubscription = interval(2000).subscribe((x =>{
      this.growPlants();
    }));
  }

  private getInventory(): void {
    // this.inventoryApi.getInventory().then(response => this.handleInventoryResponse(response));
  }

  private handleInventoryResponse(response: InventoryModel): void{
    this.inventory = response;
  }

  private getFarm(): void {
    this.farmApi.getFarm().then(response => this.handleFarmResponse(response))
      .catch(any => this.handleFarmException(any));
  }

  private handleFarmResponse(response: FarmModel): void {
    CurrentFarmModel.setFarmID(response.farmID);
		CurrentFarmModel.setOwnerID(response.ownerID);
		CurrentFarmModel.setPlots(response.plots);
    this.initPlots();
  }

  private handleFarmException(exception: any): void {
    console.warn("Exception:", exception);
  }

  private initPlots(): void {
    for(let plot of CurrentFarmModel.plots) {
      this.plots[plot.y][plot.x] = plot;
    }
  }

  private generateGrassGrid(): void {
    for(let i=0;i<10;i++) {
      let row:PlotModel[]  = new Array<PlotModel>();
      for(let j=0;j<10;j++) {
        row.push(new PlotModel(-1, j+1, i+1, 0, 0, 0, 0, false));
      }
      this.plots.push(row);
    }
  }

  getAllPlants(plotId: number,plantID: number,purchased: boolean): void {
    if(purchased == true) {
      if(plantID == 0) {
        this.plotId = plotId;
        this.plantApi.query().then(plants => this.handlePlantsResponse(plants))
          .catch(any => this.handlePlantsException(any));
      } else {
        let plant = new PlantModel(1,"0",1,plantID,50,100,1000);
        this.plotApi.oogst(plotId, plant).then(plot => this.handlePlotResponse(plot))
          .catch(any => this.handlePlotResponse(any));
      }
    } else {
      this.handlePlantsException("U do not own this plot");
    }
  }

  private handlePlantsResponse(plants: PlantResponseModel): void {
    this.plants = plants;
  }

  private handlePlantsException(exception: any): void {
    this.plants = new PlantResponseModel([]);
  }

  placePlantOnPlot(plotId: number, plant: PlantModel): void {
    this.plotApi.placePlantOnPlot(plotId, plant).then(plant => this.handlePlotResponse(plant))
      .catch(any => this.handlePlotException(any));
  }

  private handlePlotResponse(response: any): void {
    this.handlePlantsException("");
    this.getFarm();
    this.initPlots();
    this.getInventory();
  }

  private handlePlotException(exception: any): void {
    console.warn("Exception:", exception);
  }

  logout(): void {
    this.logoutApi.logout().then(response => this.handleLogoutResponse(response))
      .catch(any => this.handleLogoutException(any));
  }

  private handleLogoutResponse(response: LogoutResponseModel): void {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

  private handleLogoutException(exception: any): void {
    console.warn("Exception:", exception);
  }

  private growPlants(): void {
    console.warn("GROW THAT PLAAAANT","plant")
  }
}
