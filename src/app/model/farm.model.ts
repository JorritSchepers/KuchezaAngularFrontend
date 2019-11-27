import { PlotModel } from './plot.model';

export class FarmModel {
    farmID: number;
    ownerID: number;
    plots: PlotModel[];

    constructor(plots: PlotModel[], farmID: number, ownerID: number) {
        this.farmID = farmID;
        this.ownerID = ownerID;
        this.plots = plots;
    }
}