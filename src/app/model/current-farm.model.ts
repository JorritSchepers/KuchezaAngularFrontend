import { PlotModel } from './plot.model';

export class CurrentFarmModel {
    static farmID: number;
    static ownerID: number;
    static plots: PlotModel[] = Array();
    static width: number;
    static height: number;

    static setPlots(plots: PlotModel[]) {
        for (let newPlot of plots) {
            this.plots.push(new PlotModel(newPlot.id, newPlot.x, newPlot.y, newPlot.price
                , newPlot.animalID, newPlot.waterManagerID, newPlot.plantID, newPlot.waterSourceID, newPlot.purchased, newPlot.age, newPlot.waterAvailable, newPlot.status));
        }
    }

    static setFarmID(farmID: number) {
        this.farmID = farmID;
    }

    static setOwnerID(ownerID: number) {
        this.ownerID = ownerID;
    }

    static setHeight(height: number) {
        this.height = height;
    }

    static setWidth(width: number) {
        this.width = width;
    }
}
