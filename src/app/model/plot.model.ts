export class PlotModel {
    public ID: number;
    x: number;
    y: number;
    price: number;
    animalID: number;
    waterManagerID: number;
    plantID: number;
    image: string;
    purchased: boolean;
    age:number;
    stages: number = 3;
    growTime: number = 1000;
    waterAvailable: number;
    grown: boolean;


    constructor(ID: number, x: number, y: number, price: number,
            animalID: number, waterManagerID: number, plantID: number, purchased: boolean, age:number, waterAvailable: number) {
        this.ID = ID;
        this.x = x;
        this.y = y;
        this.price = price;
        this.animalID = animalID;
        this.waterManagerID = waterManagerID;
        this.plantID = plantID;
        this.purchased = purchased;
        this.age = age;
        this.waterAvailable = waterAvailable;
        this.grown = false;
    }

    initImage() {
        if (this.animalID != 0) {
            this.image = "../../../assets/animal/" + this.animalID + ".jpg";
        } else if (this.waterManagerID != 0) {
            this.image = "../../../assets/water-manager/" + this.waterManagerID + ".jpg";
        } else if (this.plantID != 0) {
            this.updatePlantState(this.growTime);
        } else if (this.purchased == true) {
            this.image = "../../../assets/EmptyPlot.jpg";
        } else {
            this.image = "../../../assets/BuyablePlot.jpg";
        }
    }

    updatePlantState(growTime:number): void {
        this.growTime = growTime;
        let stage:number = Math.floor((this.age*this.stages)/growTime);
        if(stage >= this.stages) {
            this.grown = true;
            stage = this.stages;
        }
        this.image = "../../../assets/plant/" + this.plantID +"/"+stage+".png";
    }

    public getWater(): String {
        if (this.plantID > 0) {
            return Math.round(this.waterAvailable)+" L"
        } else {
            return ""
        }
    }
}
