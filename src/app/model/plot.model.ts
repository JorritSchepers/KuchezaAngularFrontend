export class PlotModel {
    ID: number;
    x: number;
    y: number;
    price: number;
    animalID: number;
    waterManagerID: number;
    plantID: number;
    image: string;
    purchased: boolean;

    constructor(ID: number, x: number, y: number, price: number,
            animalID: number, waterManagerID: number, plantID: number, purchased: boolean) {
        this.ID = ID;
        this.x = x;
        this.y = y;
        this.price = price;
        this.animalID = animalID;
        this.waterManagerID = waterManagerID;
        this.plantID = plantID;
        this.purchased = purchased;
        this.initImage();
    }

    private initImage() {
        if (this.animalID != 0) {
            this.image = "../../../assets/animal/" + this.animalID + ".jpg";
        } else if (this.waterManagerID != 0) {
            this.image = "../../../assets/water-manager/" + this.waterManagerID + ".jpg";
        } else if (this.plantID != 0) {
            this.image = "../../../assets/plant/" + this.plantID + ".jpg";
        } else if (this.purchased == true) {
            this.image = "../../../assets/grass.jpg";
        } else {
            this.image = "../../../assets/buyable-plot.jpg";
        }
    }
}
