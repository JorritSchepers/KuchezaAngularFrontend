export class PlantModel {
  waterUsage: number;
  name: String;
  growingTime: number;
  id: number;
  purchasePrice: number;
  profit: number;
  age: number;
  maximumWater: number;

    constructor(waterUsage: number, name: String, growingTime: number, id: number, purchasePrice: number, profit: number, age: number) {
      this.waterUsage = waterUsage;
      this.name = name;
      this.growingTime = growingTime;
      this.id = id;
      this.purchasePrice = purchasePrice;
      this.profit = profit;
      this.age = age;
    }
}
