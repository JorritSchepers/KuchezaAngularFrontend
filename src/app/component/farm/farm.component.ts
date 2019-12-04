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
import { TokenModel } from 'src/app/model/token.model';
import { LogoutApi } from 'src/app/api/logout.api';

@Component({
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  plants: PlantResponseModel;
  plots: PlotModel[][] = new Array<Array<PlotModel>>();
  plotId: number;
  token = TokenModel.currentToken;
  FARM_SIZE_Y: number = 10;
  FARM_SIZE_X: number = 10;

  constructor(private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi, private logoutApi: LogoutApi, private router: Router) {
    this.generateGrassGrid();
    this.getFarm();
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

  getAllPlants(plotId: number,plantID: number,purchased: boolean): void {
    let WATERUSAGE_NUMBER = 1;
    let NAME = "0";
    let GROWINGTIME: number = 1;
    let PURCHASE_PRICE: number = 50;
    let PROFIT: number = 100;
    let AGE: number = 1000;
    if(purchased == false) {
      this.handleException("You do not own this plot.");
      return;
    }
    if(plantID == 0) {
      this.plotId = plotId;
      this.plantApi.getAllPlants().then(plants => this.handlePlantsResponse(plants)).catch(any => this.handleException(any));
      return;
    }
    let plant = new PlantModel(WATERUSAGE_NUMBER, NAME, GROWINGTIME, plantID, PURCHASE_PRICE, PROFIT, AGE);
    this.plotApi.harvest(plotId, plant).then(plot => this.handlePlotResponse(plot)).catch(any => this.handlePlotResponse(any));   
  }

  private handlePlantsResponse(plants: PlantResponseModel): void {
    this.plants = plants;
  }

  placePlantOnPlot(plotId: number, plant: PlantModel): void {
    this.plotApi.placePlantOnPlot(plotId, plant).then(plant => this.handlePlotResponse(plant))
      .catch(any => this.handleException(any));
  }

  private handlePlotResponse(response: any): void {
    this.closeShop();
    this.getFarm();
    this.initPlots();
  }

  logout(): void {
    this.logoutApi.logout().then(response => this.handleLogoutResponse(response))
      .catch(exception => this.handleException(exception));
  }

  private handleLogoutResponse(response: LogoutResponseModel): void {
    TokenModel.deleteCurrentToken();
    this.router.navigateByUrl('/login');
  }

  private closeShop(): void {
    this.plants = new PlantResponseModel([]);
  }

  private handleException(exception: any): void {
    console.warn("Exception:", exception);
  }
}
