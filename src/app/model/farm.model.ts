import { PlotModel } from './plot.model';

export class FarmModel {
    plots: PlotModel[];

    constructor(plots: PlotModel[]) {
        this.plots = plots;
    }
}