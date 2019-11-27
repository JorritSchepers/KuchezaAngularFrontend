import { Component } from '@angular/core';
import { FarmApi } from 'src/app/api/farm.api';
import { PlantApi } from 'src/app/api/plant.api';
import { PlotApi } from 'src/app/api/plot.api';
import { PlotModel } from 'src/app/model/plot.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';

@Component({
  selector: 'app-login',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  grassPlot: PlotModel        = new PlotModel(1, 1, 1, 10, 0, 0, 0);
  animalPlot: PlotModel       = new PlotModel(1, 1, 1, 10, 1, 0, 0);
  waterManagerPlot: PlotModel = new PlotModel(1, 1, 1, 10, 0, 1, 0);
  cropsPlot: PlotModel        = new PlotModel(2, 1, 2, 20, 0, 0, 1);
  plots: PlotModel[] = [this.grassPlot, this.animalPlot, this.waterManagerPlot, this.cropsPlot];
  plants: PlantResponseModel;

  constructor(private farmApi: FarmApi, private plantApi: PlantApi, private plotApi: PlotApi) { }

  getFarm(): void {
    this.farmApi.query();
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
