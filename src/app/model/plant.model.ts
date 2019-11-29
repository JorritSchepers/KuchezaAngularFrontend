export class PlantModel {
  waterUsage: number;
  name: string;
  growingTime: number;
  ID: number;
  purchasePrice: number;
  profit: number;
  age: number;

    constructor(waterUsage: number, name: string, growingTime: number, ID: number, purchasePrice: number, profit: number, age: number) {
      this.waterUsage = waterUsage;
      this.name = name;
      this.growingTime = growingTime;
      this.ID = ID;
      this.purchasePrice = purchasePrice;
      this.profit = profit;
      this.age = age;
    }
}
