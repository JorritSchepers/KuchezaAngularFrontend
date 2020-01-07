import { WaterSourceModel } from './watersource.model';

export class WaterSourceResponseModel {
    waterSources: WaterSourceModel[];

    constructor(waterSources: WaterSourceModel[]) {
        this.waterSources = waterSources;
    }
}
