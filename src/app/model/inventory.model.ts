export class InventoryModel {
    userID: number;
    money: number;
    water: number;

    constructor(money: float, water: float, userID: number) {
        this.userID = userID;
        this.water = water;
        this.money = money;
    }
}
