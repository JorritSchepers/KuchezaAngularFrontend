import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FarmApi } from 'src/app/api/farm.api';
import { PlantApi } from 'src/app/api/plant.api';
import { PlotApi } from 'src/app/api/plot.api';
import { PlotModel } from 'src/app/model/plot.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';
import { CurrentFarmModel } from 'src/app/model/current-farm.model';
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

  constructor(private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi, private logoutApi: LogoutApi, private router: Router) {
    this.generateGrassGrid();
    this.getFarm();
  }

  private getFarm(): void {
    this.farmApi.query().then(farm => this.initPlots())
      .catch(any => this.initPlots());
  }

  initPlots(): void {
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
        this.plantApi.query().then(plants => this.setPlants(plants))
          .catch(any => this.setEmptyPlants());
      } else {
        let plant = new PlantModel(1,"0",1,plantID,50,100,1000);
        this.plotApi.oogst(plotId, plant).then(plot => this.updatePlots())
          .catch(any => this.updatePlots());
      }
    } else {
      this.setEmptyPlants();
    }
  }

  private setPlants(plants: PlantResponseModel): void {
    this.plants = plants;
  }

  private setEmptyPlants(): void {
    this.plants = new PlantResponseModel([]);
  }

  placePlantOnPlot(plotId: number, plant: PlantModel): void {
    console.warn("PlantModel: ", plant);
    this.plotApi.query(plotId, plant).then(plot => this.updatePlots())
      .catch(any => this.updatePlots());
  }

  private updatePlots(): void {
    this.plants = new PlantResponseModel([]);
    this.getFarm();
    this.initPlots();
  }

  logout(): void {
    this.logoutApi.query();
    this.router.navigateByUrl('/login');
  }
}
