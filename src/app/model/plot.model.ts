export class PlotModel {
    id: number;
    x: number;
    y: number;
    price: number;
    animalID: number;
    waterManagerID: number;
    plantID: number;
    waterSourceID: number;
    image: string;
    purchased: boolean;
    age:number;
    stages: number = 3;
    harvestTime: number = 1000;
    waterAvailable: number;
    status: String;
    harvestable: boolean;
    maximumWater: number = 10000000;
    needsWater: boolean;
    hover: boolean;

    constructor(id: number, x: number, y: number, price: number,
            animalID: number, waterManagerID: number, plantID: number, waterSourceID: number, purchased: boolean, age:number, waterAvailable: number, status: String) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.price = price;
        this.animalID = animalID;
        this.waterManagerID = waterManagerID;
        this.plantID = plantID;
        this.waterSourceID = waterSourceID;
        this.purchased = purchased;
        this.age = age;
        this.waterAvailable = waterAvailable;
        this.harvestable = false;
        this.status = status;
        this.needsWater = this.checkIfNeedsWater();
    }

    initImage() {
        if (this.animalID != 0) {
            this.setAnimalImage();
        } else if (this.waterManagerID != 0) {
            this.image = "../../../assets/waterManager/" + this.waterManagerID + ".png";
        } else if (this.waterSourceID != 0) {
            this.image = "../../../assets/waterSource/" + this.waterSourceID + ".png";
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
        if (this.plantID > 0 || this.waterSourceID > 0) {
            return Math.round(this.waterAvailable)+" L"
        } else {
            return ""
        }
    }

    public updateWater(transition: boolean) {
        if(this.hover) {
            let water = document.getElementById("plot"+this.id);
            let width = this.waterAvailable/this.maximumWater;
            if(width > 1) {
            width = 1;
            }

            let cssString = "width: "+width*7+"vh;";

            if(width >= 0.9) {
                cssString += "border-radius: 20vh;";
            }
            if(width <= 0.25) {
                cssString += "background: linear-gradient(rgb(255,181,90) 70%, rgb(225,151,60) 70%) !important;";
            }
            if(width <= 0.1) {
                cssString += "width: 0vh !important;";
            }
            if(transition) {
                cssString += "transition: 1s;";
            }
            water.setAttribute("style", cssString);
        }
    }

    public checkIfNeedsWater(): boolean {
        return (this.plantID+this.waterSourceID) > 0;
    }

    public mouseEnter(plot: PlotModel):void {
        this.hover = true;
        this.updateWater(true);
    }

    public mouseLeave(plot: PlotModel):void {
        this.hover = false;
    }
}
