import { PlantModel } from './plant.model';

export class PlantResponseModel {
    plants: PlantModel[];

    constructor(plants: PlantModel[]) {
        this.plants = plants;
    }
}
