import { PlotModel } from './plot.model';

export class CurrentFarmModel {
    static farmID: number;
    static ownerID: number;
    static plots: PlotModel[] = Array();

    static setPlots(plots: PlotModel[]) {
        // this.plots = plots;
        for (let newPlot of plots) {
            this.plots.push(new PlotModel(newPlot.ID, newPlot.x, newPlot.y, newPlot.price
                , newPlot.animalID, newPlot.waterManagerID, newPlot.plantID, newPlot.purchased));
        }
        console.warn("plots in currentplotmodel:", this.plots)
    }

    static setFarmID(farmID: number) {
        this.farmID = farmID;
    }

    static setOwnerID(ownerID: number) {
        this.ownerID = ownerID;
    }
}