export class AnimalModel {
    waterUsage: number;
    name: String;
    productionTime: number;
    id: number;
    purchasePrice: number;
    profit: number;
    maximumWater: number;
  
      constructor(waterUsage: number, name: String, productionTime: number, id: number, purchasePrice: number, profit: number, maximumWater: number) {
        this.waterUsage = waterUsage;
        this.name = name;
        this.productionTime = productionTime;
        this.id = id;
        this.purchasePrice = purchasePrice;
        this.profit = profit;
        this.maximumWater = maximumWater;
      }
  }