import { Component } from '@angular/core';
import { FarmApi } from 'src/app/api/farm.api';
import { PlotModel } from 'src/app/model/plot.model';

@Component({
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.css']
  })
  export class FarmComponent {
                                              /*ID, x, y, price, animalID, wmID, plantID*/
    grassPlot: PlotModel        = new PlotModel(1,  1, 1, 10,    0,        0,    0);
    animalPlot: PlotModel       = new PlotModel(1,  1, 1, 10,    1,        0,    0);
    waterManagerPlot: PlotModel = new PlotModel(1,  1, 1, 10,    0,        1,    0);
    cropsPlot: PlotModel        = new PlotModel(2,  1, 2, 20,    0,        0,    1);
    plots: PlotModel[] = [this.grassPlot, this.animalPlot, this.waterManagerPlot, this.cropsPlot];

    constructor(private farmApi: FarmApi) { }

    getFarm(): void {
      this.farmApi.query();
    }
  }