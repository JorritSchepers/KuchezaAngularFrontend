import { Component } from '@angular/core';
import { PlotApi } from 'src/app/api/plot.api';

@Component({
    selector: 'app-plants',
    templateUrl: './plot.component.html',
    styleUrls: ['./plot.component.css']
  })
  export class PlotComponent {

    constructor(private plotApi: PlotApi) { }

    placePlantOnPlot(): void {
      this.plotApi.query();
    }
  }
