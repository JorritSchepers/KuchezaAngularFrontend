export class PlantModel {
  waterUsage: number;
  name: String;
  growingTime: number;
  ID: number;
  purchasePrice: number;
  profit: number;
  age: number;
  maximumWater: number;

    constructor(waterUsage: number, name: String, growingTime: number, ID: number, purchasePrice: number, profit: number, age: number) {
      this.waterUsage = waterUsage;
      this.name = name;
      this.growingTime = growingTime;
      this.ID = ID;
      this.purchasePrice = purchasePrice;
      this.profit = profit;
      this.age = age;
    }
}
