import { TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

import { AdminApi } from 'src/app/api/admin.api';
import { LogoutApi } from 'src/app/api/logout.api';
import { PlantApi } from 'src/app/api/plant.api';

import { AllUsersModel } from "src/app/model/all-users.model";
import { UserModel } from 'src/app/model/user.model';
import { LogoutResponseModel } from 'src/app/model/logout-response.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';
import { AnimalApi } from 'src/app/api/animal.api';
import { AnimalModel } from 'src/app/model/animal.model';
import { AnimalResponseModel } from 'src/app/model/animal-response.model';

const NON_ADMIN_USER_1: UserModel = new UserModel(1, "name1", "pass1", "email1", false);
const NON_ADMIN_USER_2: UserModel = new UserModel(2, "name2", "pass2", "email2", false);
const USERS: UserModel[] = [NON_ADMIN_USER_1, NON_ADMIN_USER_2];
const ALL_USER_MODEL: AllUsersModel = new AllUsersModel(USERS);

const LOGOUT_RESPONSE_MODEL: LogoutResponseModel = new LogoutResponseModel();

const PLANT_1: PlantModel = new PlantModel(10, "name1", 10, 1, 10, 10, 10);
const PLANT_2: PlantModel = new PlantModel(20, "name2", 20, 2, 20, 20, 20);
const PLANTS: PlantModel[] = [PLANT_1, PLANT_2];
const PLANT_RESPONSE_MODEL: PlantResponseModel = new PlantResponseModel(PLANTS);

const ANIMAL_1: AnimalModel = new AnimalModel(1, "name1", 1, 1, 1, 1, 1);
const ANIMAL_2: AnimalModel = new AnimalModel(2, "name2", 2, 2, 2, 2, 2);
const ANIMALS: AnimalModel[] = [ANIMAL_1, ANIMAL_2];
const ANIMAL_RESPONSE_MODEL: AnimalResponseModel = new AnimalResponseModel(ANIMALS);

describe('AdminComponent', () => {
    let sut: AdminComponent;
    let mockedAnimalApi: any;
    let mockedAdminApi: any;
    let mockedLogoutApi: any;
    let mockedPlantApi: any;

    beforeEach(() => {
        mockedAnimalApi = jasmine.createSpyObj("AnimalApi", ["getAllAnimals", "deleteAnimal"]);
        mockedAnimalApi.getAllAnimals.and.returnValue(Promise.resolve(ANIMAL_RESPONSE_MODEL));
        mockedAnimalApi.deleteAnimal.and.returnValue(Promise.resolve(ANIMAL_RESPONSE_MODEL));

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
                { provide: AnimalApi, useClass: mockedAnimalApi },
                { provide: AdminApi, useClass: mockedAdminApi },
                { provide: PlantApi, useClass: mockedPlantApi },
                { provide: LogoutApi, useClass: mockedLogoutApi }
            ]
        });
        sut = new AdminComponent(mockedAnimalApi,mockedAdminApi, mockedLogoutApi, mockedPlantApi);
	});

    it('should call getAllNonAdminUsers in AdminApi', () => {
        sut.getAllNonAdminUsers();
        expect(mockedAdminApi.getAllNonAdminUsers).toHaveBeenCalled();
    });

    it('should call getAllPlants in PlantApi', () => {
        sut.getAllPlants();
        expect(mockedPlantApi.getAllPlants).toHaveBeenCalled();
    });

    it('should set variables', () => {
        sut.showDeletePopUp(NON_ADMIN_USER_1);
        expect(sut.currentSelectedUser).toBe(NON_ADMIN_USER_1);
        expect(sut.deleteAccountPopUpIsActive).toBeTruthy();
    });

    it('should set variables', () => {
        sut.closeDeletePopUp();
        expect(sut.currentSelectedUser).toBeNull();
        expect(sut.deleteAccountPopUpIsActive).toBeFalsy();
    });

    it('should call deleteUser In AdminApi', () => {
        sut.deleteUser(1);
        expect(mockedAdminApi.deleteUser).toHaveBeenCalled();
    });

    it('should set users', () => {
        sut.initUsers(ALL_USER_MODEL);
        expect(sut.users.length).toBe(USERS.length);
    });

    it('should set veriables', () => {
        sut.showDeletePlantPopUp(PLANT_1);
        expect(sut.currentSelectedPlant).toBe(PLANT_1);
        expect(sut.deletePlantPopUpIsActive).toBeTruthy();
    });

    it('should set veriables', () => {
        sut.closeDeletePlantPopUp();
        expect(sut.currentSelectedPlant).toBeNull();
        expect(sut.currentSelectedReplacementPlant).toBeNull();
        expect(sut.deletePlantPopUpIsActive).toBeFalsy();
    });

    it('should call getAllAnimals in AnimalApi', () => {
        sut.getAllAnimals();
        expect(mockedAnimalApi.getAllAnimals).toHaveBeenCalled();
    });

    it('should set veriables', () => {
        sut.showDeleteAnimalPopUp(ANIMAL_1);
        expect(sut.currentSelectedAnimal).toBe(ANIMAL_1);
        expect(sut.deleteAnimalPopUpIsActive).toBeTruthy();
    });

    it('should set veriables', () => {
        sut.closeDeleteAnimalPopUp();
        expect(sut.currentSelectedAnimal).toBeNull();
        expect(sut.currentSelectedReplacementAnimal).toBeNull();
        expect(sut.deleteAnimalPopUpIsActive).toBeFalsy();
    });

    it('should call deletePlant In PlantApi', () => {
        sut.currentSelectedPlant = PLANT_1;
        sut.currentSelectedReplacementPlant = PLANT_2;
        sut.deletePlant();
        expect(mockedPlantApi.deletePlant).toHaveBeenCalled();
    });

    it('should call deleteAnimal In AnimalApi', () => {
        sut.currentSelectedAnimal = ANIMAL_1;
        sut.currentSelectedReplacementAnimal = ANIMAL_2;
        sut.deleteAnimal();
        expect(mockedAnimalApi.deleteAnimal).toHaveBeenCalled();
    });
});
