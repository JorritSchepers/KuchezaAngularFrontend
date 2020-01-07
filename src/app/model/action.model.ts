import { Timestamp } from 'rxjs';

export class ActionModel {
    userID: number;
    actionID: number;
    dateOfAction: any;
    affectedItem: string;
    currentWater: number;
    currentMoney: number;
    actionText: string;

    constructor(userID: number, actionID: number, dateOfAction: any, affectedItem: string,
                currentWater: number, currentMoney: number, actionText: string) {
        this.userID = userID;
        this.actionID = actionID;
        this.dateOfAction = dateOfAction;
        this.affectedItem = affectedItem;
        this.currentWater = currentWater;
        this.currentMoney = currentMoney;
        this.actionText = actionText;
    }
}