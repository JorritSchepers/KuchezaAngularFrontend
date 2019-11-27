import { Component } from '@angular/core';
import { FarmApi } from 'src/app/api/farm.api';
import { PlotModel } from 'src/app/model/plot.model';
import { CurrentFarmModel } from 'src/app/model/current-farm.model';

@Component({
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.css']
  })
  export class FarmComponent {
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
  }