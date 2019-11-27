import { Component } from '@angular/core';
import { FarmApi } from 'src/app/api/farm.api';
import { PlotModel } from 'src/app/model/plot.model';
import { CurrentFarmModel } from 'src/app/model/current-farm.model';

@Component({
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.css']
  })
  export class FarmComponent {
                                              /*ID, x, y, price, animalID, wmID, plantID*/
    grassPlot: PlotModel        = new PlotModel(1,  1, 1, 0,     0,        0,    0, true);
    animalPlot: PlotModel       = new PlotModel(2,  2, 2, 10,    1,        0,    0, true);
    waterManagerPlot: PlotModel = new PlotModel(3,  3, 3, 10,    0,        1,    0, true);
    cropsPlot: PlotModel        = new PlotModel(4,  4, 4, 20,    0,        0,    1, true);
    cropsPlot2: PlotModel       = new PlotModel(4,  4, 5, 20,    0,        0,    1, true);
    cropsPlot3: PlotModel       = new PlotModel(4,  4, 6, 20,    0,        0,    1, true);
    plots: PlotModel[][] = new Array<Array<PlotModel>>();

    constructor(private farmApi: FarmApi) {
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
      let id: number = 0;
      for(let i=0;i<10;i++) {
        let row:PlotModel[]  = new Array<PlotModel>();      
        for(let j=0;j<10;j++) {
          id++;
          row.push(new PlotModel(id, j+1, i+1, 0, 0, 0, 0, false));
        } 
        this.plots.push(row);
      }
    }

    printPlotID(plotID: number) {
      console.log("plotID:", plotID);
    }
  }