export class PlotModel {
    id: number;
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
    harvestTime: number = 1000;
    waterAvailable: number;
    status: String;
    harvestable: boolean;

    constructor(id: number, x: number, y: number, price: number,
            animalID: number, waterManagerID: number, plantID: number, purchased: boolean, age:number, waterAvailable: number, status: String) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.price = price;
        this.animalID = animalID;
        this.waterManagerID = waterManagerID;
        this.plantID = plantID;
        this.purchased = purchased;
        this.age = age;
        this.waterAvailable = waterAvailable;
        this.harvestable = false;
        this.status = status;
    }

    initImage() {
        if (this.animalID != 0) {
            this.setAnimalImage();
        } else if (this.waterManagerID != 0) {
            this.image = "../../../assets/waterManager/" + this.waterManagerID + ".png";
        } else if (this.plantID != 0) {
            if(this.status == "Normal") {
                this.setNormalPlant();
            } else if (this.status == "Dead") {
                this.setDeadPlant();
            } else if (this.status == "Dehydrated") {
                this.setDehydrathedPlant();
            }
        } else if (this.purchased == true) {
            this.image = "../../../assets/EmptyPlot.jpg";
        } else {
            this.image = "../../../assets/BuyablePlot.png";
        }
    }

    setNormalPlant(): void {
        let stage:number = Math.floor((this.age*this.stages)/this.harvestTime);
        if(stage >= this.stages) {
            this.harvestable = true;
            stage = this.stages;
        }
        this.image = "../../../assets/plant/" + this.plantID +"/normal/"+stage+".png";
    }

    setDeadPlant(): void {
        let stage:number = Math.floor((this.age*this.stages)/this.harvestTime);
        if(stage > this.stages) {
            stage = this.stages;
        }
        this.image = "../../../assets/plant/" + this.plantID +"/dead/"+stage+".png";
    }

    setDehydrathedPlant() :void {
        let stage:number = Math.floor((this.age*this.stages)/this.harvestTime);
        if(stage > this.stages) {
            this.harvestable = true;
            stage = this.stages;
        }
        this.image = "../../../assets/plant/" + this.plantID +"/dehydrated/"+stage+".png";
    }

    setAnimalImage(): void {
        let stage:number = Math.floor((this.age*this.stages)/this.harvestTime);
        if(stage >= this.stages) {
            this.harvestable = true;
            stage = this.stages;
        }
        this.image = "../../../assets/animal/" + this.animalID + "/" + stage + ".png";
    }

    public getWater(): String {
        if (this.plantID > 0) {
            return Math.round(this.waterAvailable)+" L"
        } else {
            return ""
        }
    }
}
