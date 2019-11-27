import { Component } from '@angular/core';
import { FarmApi } from 'src/app/api/farm.api';
import { PlantApi } from 'src/app/api/plant.api';
import { PlotApi } from 'src/app/api/plot.api';
import { PlotModel } from 'src/app/model/plot.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';

@Component({
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  plants: PlantResponseModel;
  plots: PlotModel[][] = new Array<Array<PlotModel>>();

  constructor(private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi) {
    this.generateGrassGrid();
    this.getFarm();
   }

  private getFarm(): void {
    this.farmApi.query();
  }

  initPlots() {
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

  printPlotID(plotID: number) {
    console.log("plotID:", plotID);
  }

  getAllPlants(): void {
    this.plantApi.query().then(plants => this.setPlants(plants))
      .catch(any => this.setEmptyPlants());
  }

  private setPlants(plants: PlantResponseModel): void {
    this.plants = plants;
  }

  private setEmptyPlants(): void {
    this.plants = new PlantResponseModel([]);
  }

  placePlantOnPlot(plant: PlantModel): void {
    console.warn("PlantModel: ", plant);
    this.plotApi.query(1, plant).then(plants => this.updatePlots())
      .catch(any => this.updatePlots());
  }

  private updatePlots(): void {
    this.plants = new PlantResponseModel([]);
  }
}
