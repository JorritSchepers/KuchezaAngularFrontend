export class InventoryModel {
    userID: number;
    money: number;
    water: number;

    constructor(money: number, water: number, userID: number) {
        this.userID = userID;
        this.water = water;
        this.money = money;
    }
}
