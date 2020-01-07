export class WaterSourceModel {
    id: number;
    waterYield: number;
    maximumWater: number;
    purchasePrice: number;
    name: string;

      constructor(id: number, waterYield: number, maximumWater: number, purchasePrice: number, name: string) {
        this.id = id;
        this.waterYield = waterYield;
        this.maximumWater = maximumWater;
        this.purchasePrice = purchasePrice;
        this.name = name;
      }
  }