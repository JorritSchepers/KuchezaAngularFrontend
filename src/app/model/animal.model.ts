export class AnimalModel {
  waterUsage: number;
  name: String;
  productionTime: number;
  ID: number;
  purchasePrice: number;
  profit: number;
  maximumWater: number;

    constructor(waterUsage: number, name: String, productionTime: number, ID: number, purchasePrice: number, profit: number, maximumWater: number) {
      this.waterUsage = waterUsage;
      this.name = name;
      this.productionTime = productionTime;
      this.ID = ID;
      this.purchasePrice = purchasePrice;
      this.profit = profit;
      this.maximumWater = maximumWater;
    }
}
