import { PlotModel } from './plot.model';

export class CurrentFarmModel {
    static farmID: number;
    static ownerID: number;
    static plots: PlotModel[] = Array();
    static WIDTH: number;
    static HEIGHT: number;

    static setPlots(plots: PlotModel[]) {
        for (let newPlot of plots) {
            this.plots.push(new PlotModel(newPlot.ID, newPlot.x, newPlot.y, newPlot.price
                , newPlot.animalID, newPlot.waterManagerID, newPlot.plantID, newPlot.purchased, newPlot.age, newPlot.waterAvailable, newPlot.status));
        }
    }

    static setFarmID(farmID: number) {
        this.farmID = farmID;
    }

    static setOwnerID(ownerID: number) {
        this.ownerID = ownerID;
    }

    static setHEIGHT(HEIGHT: number) {
        this.HEIGHT = HEIGHT;
    }

    static setWIDTH(WIDTH: number) {
        this.WIDTH = WIDTH;
    }
}
