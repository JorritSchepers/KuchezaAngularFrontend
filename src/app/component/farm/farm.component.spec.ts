// import { TestBed } from '@angular/core/testing';
// import { FarmComponent } from './farm.component';
// import { FarmModel } from 'src/app/model/farm.model';
// import { PlotModel } from 'src/app/model/plot.model';
// import { FarmApi } from 'src/app/api/farm.api';
// import { InventoryModel } from 'src/app/model/inventory.model';
// import { PlantResponseModel } from 'src/app/model/plant-response.model';
// import { PlantModel } from 'src/app/model/plant.model';
// import { InventoryApi } from 'src/app/api/inventory.api';
// import { PlotApi } from 'src/app/api/plot.api';
// import { PlantApi } from 'src/app/api/plant.api';
// import { LogoutApi } from 'src/app/api/logout.api';
// import { Router } from '@angular/router';

// const WIDTH: number = 10;
// const HEIGHT: number = 10;
// const FARM_ID: number = 1;
// const USER_ID: number = 1;
// const PRICE: number = 10;
// const PLANT_ID: number = 1;
// const AGE: number = 15;
// const MONEY: number = 150;
// const WATER: number = 200;
// const WATER_USAGE: number = 12;
// const PLANT_NAME: string = "plant name";
// const GROWING_TIME: number = 60;

// const FARM_MODEL: FarmModel = new FarmModel(Array<PlotModel>(WIDTH*HEIGHT), FARM_ID, USER_ID, WIDTH, HEIGHT);
// const EMPTY_PLOT_MODEL: PlotModel = new PlotModel(1, 1, 1, PRICE, 0, 0, 0, true, AGE);
// const PLOT_WITH_PLANT_MODEL: PlotModel = new PlotModel(2, 2, 2, PRICE, 0, 0, PLANT_ID, true, AGE);
// const INVENTORY_MODEL: InventoryModel = new InventoryModel(MONEY, WATER, USER_ID);
// const PLANT: PlantModel = new PlantModel(WATER_USAGE, PLANT_NAME, GROWING_TIME, PLANT_ID, PRICE, PRICE + 10);
// const PLANTS: PlantResponseModel = new PlantResponseModel([PLANT]);

// describe('FarmComponent', () => {
//     let mockedFarmApi: any;
//     let mockedInventoryApi: any;
//     let mockedPlotApi: any;
//     let mockedPlantApi: any;
//     let mockedLogoutApi: any;
//     let mockedRouter: any;
//     let sut: FarmComponent;

//     beforeEach(() => {
//         mockedFarmApi = jasmine.createSpyObj("FarmApi", ["getFarm"]);
//         mockedFarmApi.getFarm.and.returnValue(Promise.resolve(FARM_MODEL).then(response => this.handleFarmResponse(response))
//         .catch(any => this.handleException(any)));

//         mockedPlotApi = jasmine.createSpyObj("PlotApi", ["harvest", "placePlantOnPlot", "updateAge", "purchasePlot"]);
//         mockedPlotApi.harvest.and.returnValue(Promise.resolve(EMPTY_PLOT_MODEL).then(plot => this.handlePlotResponse(plot))
//         .catch(any => this.handlePlotResponse(any)));

//         mockedInventoryApi = jasmine.createSpyObj("InventoryApi", ["getInventory"]);
//         mockedPlantApi = jasmine.createSpyObj("PlantApi", ["getAllPlants"]);
//         mockedLogoutApi = jasmine.createSpyObj("LogoutApi", ["logout"]);
//         mockedRouter = jasmine.createSpyObj("Router", ["navigateByUrl"]);

//         TestBed.configureTestingModule({
// 			declarations: [FarmComponent],
//             providers: [
//                 { provide: InventoryApi, useClass: mockedInventoryApi },
//                 { provide: FarmApi, useClass: mockedFarmApi },
//                 { provide: PlotApi, useClass: mockedPlotApi },
//                 { provide: PlantApi, useClass: mockedPlantApi },
//                 { provide: LogoutApi, useClass: mockedLogoutApi },
//                 { provide: Router, useClass: mockedRouter }
//               ]
//         });
//         sut = new FarmComponent(mockedInventoryApi, mockedFarmApi, mockedPlantApi, mockedPlotApi, mockedLogoutApi, mockedRouter);
// 	});

//     it('getFarm should call getFarm from FarmApi', () => {
//         sut.getFarm();
//         expect(mockedFarmApi.getFarm).toHaveBeenCalled();
//     });

//     it('getInventory should call getInventory from InventoryApi', () => {
//         mockedInventoryApi.getInventory.and
//             .returnValue(Promise.resolve(INVENTORY_MODEL)
//             .then(response => this.handleInventoryResponse(response))
//             .catch(any => this.handleException(any)));

//         sut.getInventory();
//         expect(mockedInventoryApi.getInventory).toHaveBeenCalled();
//     });

//     it('placePlantOnPlot should call placePlantOnPlot from PlotApi', () => {
//         mockedPlotApi.placePlantOnPlot.and
//             .returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL)
//             .then(plant => this.handlePlotResponse(plant))
//             .catch(any => this.handleException(any)));

//         sut.placePlantOnPlot(EMPTY_PLOT_MODEL.ID, PLANT);
//         expect(mockedPlotApi.placePlantOnPlot).toHaveBeenCalled();
//     });

//     it('logout should call logout from LogoutApi', () => {
//         mockedLogoutApi.logout.and
//             .returnValue(Promise.resolve(null)
//             .then(response => this.handleLogoutResponse())
//             .catch(exception => this.handleException(exception)));

//         sut.logout();
//         expect(mockedLogoutApi.logout).toHaveBeenCalled();
//     });

//     it('callPurchasePlot should call callPurchasePlot from PlotApi', () => {
//         mockedPlotApi.purchasePlot.and
//             .returnValue(Promise.resolve(EMPTY_PLOT_MODEL)
//             .then(response => this.handlePlotResponse(response))
//             .catch(exception => this.handleException(exception)));

//         sut.callPurchasePlot(1);
//         expect(mockedPlotApi.purchasePlot).toHaveBeenCalled();
//     });

//     it('closePlotModal should set purchasePlot on false', () => {
//         sut.purchasePlot = true;
//         sut.closePlotModal();
//         expect(sut.purchasePlot).toBeFalsy();
//     });

//     it('getGrowTime should ', () => {
//         sut.plantTypes = PLANTS.plants;
//         expect(sut.getGrowTime(PLANT.ID)).toBe(PLANT.growingTime);
//     });
// });
