import { PlotModel } from './plot.model';

export class FarmModel {
    farmID: number;
    ownerID: number;
    plots: PlotModel[];
    WIDTH: number;
    HEIGHT: number;

    constructor(plots: PlotModel[], farmID: number, ownerID: number, WIDTH: number, HEIGHT: number) {
        this.farmID = farmID;
        this.ownerID = ownerID;
        this.plots = plots;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
    }
}