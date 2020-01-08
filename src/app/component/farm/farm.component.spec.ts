import { TestBed } from '@angular/core/testing';
import { FarmComponent } from './farm.component';
import { FarmModel } from 'src/app/model/farm.model';
import { PlotModel } from 'src/app/model/plot.model';
import { FarmApi } from 'src/app/api/farm.api';
import { CurrentFarmModel } from 'src/app/model/current-farm.model';
import { InventoryModel } from 'src/app/model/inventory.model';
import { PlantResponseModel } from 'src/app/model/plant-response.model';
import { PlantModel } from 'src/app/model/plant.model';
import { InventoryApi } from 'src/app/api/inventory.api';
import { PlotApi } from 'src/app/api/plot.api';
import { PlantApi } from 'src/app/api/plant.api';
import { LogoutApi } from 'src/app/api/logout.api';
import { CookieService } from 'ngx-cookie-service';
import { AnimalModel } from 'src/app/model/animal.model';
import { AnimalApi } from 'src/app/api/animal.api';
import { BuildingApi } from 'src/app/api/building.api';
import { WaterSourceModel } from 'src/app/model/watersource.model';
import { WaterSourceResponseModel } from 'src/app/model/watersource-response.model';

const WIDTH: number = 10;
const HEIGHT: number = 10;
const FARM_ID: number = 1;
const USER_ID: number = 1;
const PLOT_ID: number = 1;
const ANIMAL_ID: number = 1;
const PRICE: number = 10;
const PLANT_ID: number = 1;
const AGE: number = 15;
const MONEY: number = 150;
const WATER: number = 200;
const WATER_USAGE: number = 12;
const PLANT_NAME: string = "plant name";
const ANIMAL_NAME: string = "animal name";
const GROWING_TIME: number = 60;
const WATER_AVAILABLE: number = 25;
const PLANT_STATUS_NORMAL: string = "Normal";

const EMPTY_PLOT_MODEL: PlotModel = new PlotModel(1, 1, 1, PRICE, 0, 0, 0, 0, true, AGE, 0, PLANT_STATUS_NORMAL);
const PLOT_WITH_PLANT_MODEL: PlotModel = new PlotModel(2, 2, 2, PRICE, 0, 0, 0, PLANT_ID, true, AGE, 25, PLANT_STATUS_NORMAL);
const PLOTS: PlotModel[] = [EMPTY_PLOT_MODEL, PLOT_WITH_PLANT_MODEL];
const FARM_MODEL: FarmModel = new FarmModel(PLOTS, FARM_ID, USER_ID, WIDTH, HEIGHT);
const INVENTORY_MODEL: InventoryModel = new InventoryModel(MONEY, WATER, USER_ID);
const ANIMAL_MODEL: AnimalModel = new AnimalModel(WATER_USAGE, ANIMAL_NAME, GROWING_TIME, ANIMAL_ID, PRICE, PRICE, WATER_AVAILABLE);
const PLANT: PlantModel = new PlantModel(WATER_USAGE, PLANT_NAME, GROWING_TIME, PLANT_ID, PRICE, PRICE + 10, 0);
const PLANTS: PlantResponseModel = new PlantResponseModel([PLANT]);
const PLANT_MODELS: PlantModel[] = [PLANT];
const WATERSOURCE_MODEL: WaterSourceModel = new WaterSourceModel(1, 20, 200, 50, 'silo');
const WATERSOURCES: WaterSourceModel[] = [WATERSOURCE_MODEL];
const WATERSOURCERESPONSEMODEL: WaterSourceResponseModel = new WaterSourceResponseModel(WATERSOURCES);

describe('FarmComponent', () => {
    let mockedFarmApi: any;
    let mockedAnimalApi: any;
    let mockedInventoryApi: any;
    let mockedPlotApi: any;
    let mockedPlantApi: any;
    let mockedLogoutApi: any;
    let mockedCookieService: any;
    let mockedBuildingApi: any;
    let sut: FarmComponent;

    beforeEach(() => {
        mockedFarmApi = jasmine.createSpyObj("FarmApi", ["getFarm"]);
        mockedFarmApi.getFarm.and.returnValue(Promise.resolve(FARM_MODEL));

        mockedPlotApi = jasmine.createSpyObj("PlotApi", ["harvest", "placePlantOnPlot", "updateAge", "purchasePlot", "editWater", "updateStatus", "sellProduct"]);
        mockedPlotApi.harvest.and.returnValue(Promise.resolve(EMPTY_PLOT_MODEL));
        mockedPlotApi.placePlantOnPlot.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.editWater.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.updateAge.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.updateStatus.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.purchasePlot.and.returnValue(Promise.resolve(PLOTS));

        mockedAnimalApi = jasmine.createSpyObj("AnimalApi", ["getAllAnimals"]);
        mockedAnimalApi.getAllAnimals.and.returnValue(Promise.resolve(ANIMAL_MODEL));

        mockedInventoryApi = jasmine.createSpyObj("InventoryApi", ["getInventory"]);
        mockedInventoryApi.getInventory.and.returnValue(Promise.resolve(INVENTORY_MODEL));

        mockedPlantApi = jasmine.createSpyObj("PlantApi", ["getAllPlants"]);
        mockedPlantApi.getAllPlants.and.returnValue(Promise.resolve(PLANT));

        mockedLogoutApi = jasmine.createSpyObj("LogoutApi", ["logout"]);

        mockedCookieService = jasmine.createSpyObj("CookieService", ["get"]);
        mockedCookieService.get.and.returnValue("1234");

        mockedBuildingApi = jasmine.createSpyObj("BuildingApi", ["getAllWaterSources"]);
        mockedBuildingApi.getAllWaterSources.and.returnValue(Promise.resolve(WATERSOURCERESPONSEMODEL));

        TestBed.configureTestingModule({
			declarations: [FarmComponent],
            providers: [
                { provide: CookieService, useClass: mockedCookieService },
                { provide: AnimalApi, useClass: mockedAnimalApi },
                { provide: InventoryApi, useClass: mockedInventoryApi },
                { provide: FarmApi, useClass: mockedFarmApi },
                { provide: PlotApi, useClass: mockedPlotApi },
                { provide: PlantApi, useClass: mockedPlantApi },
                { provide: LogoutApi, useClass: mockedLogoutApi },
                { provide: BuildingApi, useClass: mockedBuildingApi }
              ]
        });
        sut = new FarmComponent(mockedAnimalApi, mockedCookieService, mockedInventoryApi, mockedFarmApi, mockedPlantApi, mockedPlotApi, mockedLogoutApi, mockedBuildingApi);
	});

  it('should resetPurchaseId reset purchasePlant, purchaseAnimal & wantToPurchase', () => {
      sut.resetPurchaseId();
      expect(sut.purchasePlant).toBeNull();
      expect(sut.purchaseAnimal).toBeNull();
      expect(sut.wantToPurchase).toBeFalsy();
  });

  it('should prepareFarm preparePlots', () => {
        mockedFarmApi.getFarm.and.returnValue(Promise.resolve(FARM_MODEL));
        sut.prepareFarm();
        expect(mockedFarmApi.getFarm).toHaveBeenCalled();
  });

  it('should resetVariables reset purchasePlot, wantToGiveWater, harvestModal, showPlantshop, showAnimalshop & wantToPurchase', () => {
      sut.resetVariables();
      expect(sut.purchasePlot).toBeFalsy();
      expect(sut.wantToGiveWater).toBeFalsy();
      expect(sut.harvestModal).toBeFalsy();
      expect(sut.showPlantshop).toBeFalsy();
      expect(sut.showAnimalshop).toBeFalsy();
      expect(sut.wantToPurchase).toBeFalsy();
      expect(sut.gameplayLoopEnd).toBeFalsy();
  });

  it('should set current farm model', () => {
      sut.waterSourceTypes = WATERSOURCES;
      sut.preparePlots(FARM_MODEL);
      expect(CurrentFarmModel.width).toBeDefined();
      expect(CurrentFarmModel.height).toBeDefined();
      expect(CurrentFarmModel.farmID).toBeDefined();
      expect(CurrentFarmModel.ownerID).toBeDefined();
      expect(CurrentFarmModel.plots).toBeDefined();
  });

  it('should createGrid grid plots', () => {
      sut.createGrid(WIDTH, HEIGHT);
      expect(sut.plots).toBeDefined();
  });

  it('should harvestPlantFromPlot harvest plant on plot', () => {
      sut.activePlot = EMPTY_PLOT_MODEL;
        mockedPlotApi.harvest.and
          .returnValue(Promise.resolve(EMPTY_PLOT_MODEL));

        sut.harvestPlantFromPlot();
        expect(sut.harvestModal).toBeFalsy();
        expect(mockedPlotApi.harvest).toHaveBeenCalled();
  });

  it('should givePlantWater water plant on plot', () => {
      mockedPlotApi.editWater.and
        .returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));

        sut.giveWater(PLOT_WITH_PLANT_MODEL);
        expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should sellProductFromPlot sell the product on plot', () => {
        sut.activePlot = PLOT_WITH_PLANT_MODEL;
        mockedPlotApi.sellProduct.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));

        sut.sellProductFromPlot();
        expect(sut.sellProductModal).toBeFalsy();
        expect(mockedPlotApi.sellProduct).toBeDefined();
  });

  it('should toggleBuildingShop toggle building shop', () => {
      sut.toggleBuildingShop();
      expect(sut.showBuildingshop).toBeTruthy();
      expect(sut.showAnimalshop).toBeFalsy();
      expect(sut.showPlantshop).toBeFalsy();
  });

  it('should toggleAnimalShop toggle animal shop', () => {
      sut.toggleAnimalShop();
      expect(sut.showAnimalshop).toBeTruthy();
      expect(sut.showPlantshop).toBeFalsy();
      expect(sut.showBuildingshop).toBeFalsy();
  });

  it('should togglePlantShop toggle plant shop', () => {
      sut.togglePlantShop();
      expect(sut.showPlantshop).toBeTruthy();
      expect(sut.showAnimalshop).toBeFalsy();
      expect(sut.showBuildingshop).toBeFalsy();
  });

  it('should gatherWater gather water', () => {
      sut.gatherWater();
      expect(sut.wantToGiveWater).toBeTruthy();
  });

  it('should openPlotShop open shop for plot', () => {
      sut.openPlotShop(PRICE);
      expect(sut.purchasePlot).toBeTruthy();
      expect(sut.plotPrice).toBeDefined(PRICE);
  });

  it('should call getWaterSources in building api', () => {
    mockedBuildingApi.getAllWaterSources.and
      .returnValue(Promise.resolve(WATERSOURCERESPONSEMODEL));

      sut.getWaterSources();
      expect(mockedBuildingApi.getAllWaterSources).toHaveBeenCalled();
  });

  it('should logout call logout from LogoutApi', () => {
      mockedLogoutApi.logout.and
          .returnValue(Promise.resolve(null)
          .then(response => this.handleLogoutResponse())
          .catch(exception => this.handleException(exception)));

      sut.logout();
      expect(mockedLogoutApi.logout).toHaveBeenCalled();
  });

  it('should timerActive activate timer', () => {
      sut.timerActive();
      expect(mockedCookieService.get).toBeDefined();
  });

  it('should dehydratePlant be dehydrated', () => {
      sut.dehydratePlant(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);

      expect(mockedPlotApi.updateStatus).toHaveBeenCalled();
      expect(PLOT_WITH_PLANT_MODEL.status).toEqual("Dehydrated");
  });

  it('should dehydratedPlantAction be the action for dehydrated plants', () => {
      sut.plantTypes = PLANT_MODELS;
      let oldWaterAvailable = PLOT_WITH_PLANT_MODEL.waterAvailable;
      sut.dehydratedPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
      expect(mockedPlotApi.editWater).toHaveBeenCalled();
      expect(PLOT_WITH_PLANT_MODEL.waterAvailable).toBe(oldWaterAvailable-WATER_USAGE);
  });

  it('should normalPlantAction be an action when normal status', () => {
      sut.plantTypes = PLANT_MODELS;
      let oldWaterAvailable = PLOT_WITH_PLANT_MODEL.waterAvailable;
      sut.normalPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
      expect(mockedPlotApi.editWater).toHaveBeenCalled();
      expect(PLOT_WITH_PLANT_MODEL.waterAvailable).toBe(oldWaterAvailable-WATER_USAGE);
  });

  it('should call callGameplayLoopEnd when called', () => {
      sut.inventory = INVENTORY_MODEL;
      sut.inventory.water = 0;
      sut.callGameplayLoopEnd();
      expect(sut.gameplayLoopEnd).toBeTruthy()
  });

  it('should callPurchasePlot be a call for purchase plot', () => {
    mockedPlotApi.purchasePlot.and
      .returnValue(Promise.resolve(EMPTY_PLOT_MODEL));

      sut.callPurchasePlot(PLOT_ID);
      expect(mockedPlotApi.purchasePlot).toHaveBeenCalled();
  });

  it('should getAllPlantTypes to get all types', () => {
      sut.plants = PLANTS;
      sut.getAllPlantTypes(PLANTS);
      expect(sut.plantTypes).toBe(PLANTS.plants);
  });

  it('should getGrowTime to receive grow time', () => {
      sut.plantTypes = PLANTS.plants;
      expect(sut.getGrowTime(PLANT_ID)).toBe(PLANT.growingTime);
  });

  it('should return 0 when getGrowTIme gets unkown plantID', () => {
      sut.plantTypes = PLANTS.plants;
      expect(sut.getGrowTime(5)).toBe(0);
  });

  it('should getWaterUsage to receive water usage', () => {
    sut.plantTypes = PLANTS.plants;
    expect(sut.getWaterUsage(PLANT_ID)).toBe(PLANT.waterUsage);
  });

  it('should return 0 when getWaterUsage gets unkown plantID', () => {
      sut.plantTypes = PLANTS.plants;
      expect(sut.getWaterUsage(5)).toBe(0);
  });

  it('should getMaximumWater to receive maximum water', () => {
    sut.plantTypes = PLANTS.plants;
    expect(sut.getMaximumWater(PLANT_ID)).toBe(PLANT.maximumWater);
  });

  it('should return 0 when getMaximumWater gets unkown plantID', () => {
      sut.plantTypes = PLANTS.plants;
      expect(sut.getMaximumWater(5)).toBe(0);
  });

  it('should getInventory to receive inventory', () => {
      mockedInventoryApi.getInventory.and
        .returnValue(Promise.resolve(INVENTORY_MODEL));

      sut.getInventory();
      expect(mockedInventoryApi.getInventory).toHaveBeenCalled();
  });

  it('should getAllPlants to receive all plants', () => {
      mockedPlantApi.getAllPlants.and
        .returnValue(Promise.resolve(PLANT));

      sut.getAllPlants();
      expect(mockedPlantApi.getAllPlants).toHaveBeenCalled();
  });

  it('should getAllAnimals to receive all animals', () => {
      mockedAnimalApi.getAllAnimals.and
        .returnValue(Promise.resolve(ANIMAL_MODEL));

      sut.getAllAnimals();
      expect(mockedAnimalApi.getAllAnimals).toHaveBeenCalled();
  });

  it('should setpurchasePlant to set the purchase plant', () => {
    sut.setpurchasePlant(PLANT);
    expect(sut.purchaseAnimal).toBeNull();
    expect(sut.wantToPurchase).toBeTruthy();
    expect(sut.purchasePlant).toBeDefined(PLANT);
    expect(sut.showPlantshop).toBeFalsy();
  });

  it('should setpurchaseAnimal to set the purchase animal', () => {
    sut.setpurchaseAnimal(ANIMAL_MODEL);
    expect(sut.purchaseAnimal).toBeDefined(ANIMAL_MODEL);
    expect(sut.purchasePlant).toBeNull();
    expect(sut.wantToPurchase).toBeTruthy();
    expect(sut.showAnimalshop).toBeFalsy();
  });
});
