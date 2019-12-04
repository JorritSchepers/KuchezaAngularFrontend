import { PlotModel } from './plot.model';

export class AllPlotModel {
    plots: PlotModel[];

    constructor(plots: PlotModel[]) {
        this.plots = plots;
    }
}
