import { ActionModel } from './action.model';

export class AllActionsModel {
    actions: ActionModel[];

    constructor(actions: ActionModel[]) {
        this.actions = actions;
    }
}