import { AnimalModel } from './animal.model';

export class AnimalResponseModel {
    animals: AnimalModel[];

    constructor(animals: AnimalModel[]) {
        this.animals = animals;
    }
}