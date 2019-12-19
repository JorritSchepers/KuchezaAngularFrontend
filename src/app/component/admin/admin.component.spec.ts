import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AdminApi } from 'src/app/api/admin.api';
import { LogoutApi } from 'src/app/api/logout.api';
import { PlantApi } from 'src/app/api/plant.api';

import { AllUsersModel } from "src/app/model/all-users.model";
import { UserModel } from 'src/app/model/user.model';
import { LogoutResponseModel } from 'src/app/model/logout-response.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';

const NON_ADMIN_USER_1: UserModel = new UserModel(1, "name1", "pass1", "email1", false);
const NON_ADMIN_USER_2: UserModel = new UserModel(2, "name2", "pass2", "email2", false);
const USERS: UserModel[] = [NON_ADMIN_USER_1, NON_ADMIN_USER_2];
const ALL_USER_MODEL: AllUsersModel = new AllUsersModel(USERS);
const LOGOUT_RESPONSE_MODEL: LogoutResponseModel = new LogoutResponseModel();
const PLANT_1: PlantModel = new PlantModel(10, "name1", 10, 1, 10, 10, 10);
const PLANT_2: PlantModel = new PlantModel(20, "name2", 20, 2, 20, 20, 20);
const PLANTS: PlantModel[] = [PLANT_1, PLANT_2];
const PLANT_RESPONSE_MODEL: PlantResponseModel = new PlantResponseModel(PLANTS);

describe('AdminComponent', () => {
    let sut: AdminComponent;
    let mockedAdminApi: any;
    let mockedLogoutApi: any;
    let mockedPlantApi: any;

    beforeEach(() => {
        mockedAdminApi = jasmine.createSpyObj("AdminApi", ["getAllNonAdminUsers", "deleteUser"]);
        mockedAdminApi.getAllNonAdminUsers.and.returnValue(Promise.resolve(ALL_USER_MODEL));
        mockedAdminApi.deleteUser.and.returnValue(Promise.resolve(NON_ADMIN_USER_1));

        mockedLogoutApi = jasmine.createSpyObj("LogoutApi", ["logout"]);
        mockedLogoutApi.logout.and.returnValue(Promise.resolve(LOGOUT_RESPONSE_MODEL));

        mockedPlantApi = jasmine.createSpyObj("PlantApi", ["getAllPlants", "deletePlant"]);
        mockedPlantApi.getAllPlants.and.returnValue(Promise.resolve(PLANT_RESPONSE_MODEL));
        mockedPlantApi.deletePlant.and.returnValue(Promise.resolve(PLANT_RESPONSE_MODEL));

        TestBed.configureTestingModule({
            declarations: [AdminComponent],
            providers: [
                { provide: AdminApi, useClass: mockedAdminApi },
                { provide: PlantApi, useClass: mockedPlantApi },
                { provide: LogoutApi, useClass: mockedLogoutApi }
            ]
        });
        sut = new AdminComponent(mockedAdminApi, mockedLogoutApi, mockedPlantApi);
	});

    it('should call getAllNonAdminUsers in AdminApi', () => {
        sut.getAllNonAdminUsers();
        expect(mockedAdminApi.getAllNonAdminUsers).toHaveBeenCalled();
    });

    it('should call getAllPlants in PlantApi', () => {
        sut.getAllPlants();
        expect(mockedPlantApi.getAllPlants).toHaveBeenCalled();
    });

    it('should', () => {
        sut.showDeletePopUp(NON_ADMIN_USER_1);
        expect(sut.currentSelectedUser).toBe(NON_ADMIN_USER_1);
        expect(sut.deleteAccountPopUpIsActive).toBeTruthy();
    });

    it('should', () => {
        sut.closeDeletePopUp();
        expect(sut)
    });


});
