import { TestBed } from '@angular/core/testing';
import { FarmComponent } from './farm.component';
import { FarmModel } from 'src/app/model/farm.model';
import { PlotModel } from 'src/app/model/plot.model';
import { CurrentFarmModel } from 'src/app/model/current-farm.model';
import { FarmApi } from 'src/app/api/farm.api';
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
import { AnimalResponseModel } from 'src/app/model/animal-response.model';

const WIDTH: number = 10;
const HEIGHT: number = 10;
const FARM_ID: number = 1;
const USER_ID: number = 1;
const PLOT_ID: number = 1;
const ANIMAL_ID: number = 1;
const PLANT_ID: number = 1;
const PRICE: number = 10;
const AGE: number = 15;
const MONEY: number = 150;
const WATER: number = 200;
const WATER_USAGE: number = 12;
const PLANT_NAME: string = "plant name";
const ANIMAL_NAME: string = "animal name";
const GROWING_TIME: number = 60;
const WATER_AVAILABLE: number = 25;
const STATUS_NORMAL: string = "Normal";
const STATUS_DEHYDRATED: string = "Dehydrated";
const STATUS_DEAD: string = "Dead";

const ANIMAL: AnimalModel = new AnimalModel(WATER_USAGE, ANIMAL_NAME, GROWING_TIME, ANIMAL_ID, PRICE, PRICE, WATER_AVAILABLE);
const ANIMALS: AnimalModel[] = [ANIMAL];
const ANIMAL_RESPONSE_MODEL: AnimalResponseModel = new AnimalResponseModel(ANIMALS);

const INVENTORY_MODEL: InventoryModel = new InventoryModel(MONEY, WATER, USER_ID);

const PLANT: PlantModel = new PlantModel(WATER_USAGE, PLANT_NAME, GROWING_TIME, PLANT_ID, PRICE, PRICE + 10, 0);
const PLANTS: PlantModel[] = [PLANT];
const PLANT_RESPONSE_MODEL: PlantResponseModel = new PlantResponseModel(PLANTS);

const WATERSOURCE: WaterSourceModel = new WaterSourceModel(1, 20, 200, 50, 'silo');
const WATERSOURCES: WaterSourceModel[] = [WATERSOURCE];
const WATERSOURCE_RESPONSE_MODEL: WaterSourceResponseModel = new WaterSourceResponseModel(WATERSOURCES);

const EMPTY_PLOT_MODEL: PlotModel = new PlotModel(1, 1, 1, PRICE, 0, 0, 0, 0, true, AGE, 0, STATUS_NORMAL);
const PLOT_WITH_PLANT_MODEL: PlotModel = new PlotModel(2, 2, 2, PRICE, 0, 0, 0, PLANT_ID, true, AGE, 25, STATUS_NORMAL);
const PLOT_WITH_ANIMAL_MODEL: PlotModel = new PlotModel(3, 3, 3, PRICE, 0, ANIMAL.id, 0, 0, true, AGE, 25, STATUS_NORMAL);
const PLOTS: PlotModel[] = [EMPTY_PLOT_MODEL, PLOT_WITH_PLANT_MODEL];
const FARM: FarmModel = new FarmModel(PLOTS, FARM_ID, USER_ID, WIDTH, HEIGHT);

describe('FarmComponent', () => {
    let mockedFarmApi: any;
    let mockedAnimalApi: any;
    let mockedInventoryApi: any;
    let mockedPlotApi: any;
    let mockedPlantApi: any;
    let mockedLogoutApi: any;
    let mockedCookieService: any;
    let mockedBuildingApi: any;
    let mockedTitle: any;
    let sut: FarmComponent;

    beforeEach(() => {
        mockedTitle = jasmine.createSpyObj("Title", ["setTitle"]);

        mockedFarmApi = jasmine.createSpyObj("FarmApi", ["getFarm"]);
        mockedFarmApi.getFarm.and.returnValue(Promise.resolve(FARM));

        mockedPlotApi = jasmine.createSpyObj("PlotApi", ["harvest", "placePlantOnPlot", "updateAge", 
                                                         "purchasePlot", "editWater", "updateStatus", 
                                                         "sellProduct", "placeAnimalOnPlot"]);
        mockedPlotApi.harvest.and.returnValue(Promise.resolve(EMPTY_PLOT_MODEL));
        mockedPlotApi.placePlantOnPlot.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.editWater.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.updateAge.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.updateStatus.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));
        mockedPlotApi.purchasePlot.and.returnValue(Promise.resolve(PLOTS));
        mockedPlotApi.placeAnimalOnPlot.and.returnValue(Promise.resolve(PLOTS));

        mockedAnimalApi = jasmine.createSpyObj("AnimalApi", ["getAllAnimals"]);
        mockedAnimalApi.getAllAnimals.and.returnValue(Promise.resolve(ANIMAL));

        mockedInventoryApi = jasmine.createSpyObj("InventoryApi", ["getInventory", "editInventoryWater"]);
        mockedInventoryApi.getInventory.and.returnValue(Promise.resolve(INVENTORY_MODEL));
        mockedInventoryApi.editInventoryWater.and.returnValue(Promise.resolve(INVENTORY_MODEL));

        mockedPlantApi = jasmine.createSpyObj("PlantApi", ["getAllPlants"]);
        mockedPlantApi.getAllPlants.and.returnValue(Promise.resolve(PLANT));

        mockedLogoutApi = jasmine.createSpyObj("LogoutApi", ["logout"]);

        mockedCookieService = jasmine.createSpyObj("CookieService", ["get"]);
        mockedCookieService.get.and.returnValue("1234");

        mockedBuildingApi = jasmine.createSpyObj("BuildingApi", ["getAllWaterSources"]);
        mockedBuildingApi.getAllWaterSources.and.returnValue(Promise.resolve(WATERSOURCE_RESPONSE_MODEL));

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
        sut = new FarmComponent(mockedTitle, mockedAnimalApi, mockedCookieService, mockedInventoryApi, mockedFarmApi, mockedPlantApi, mockedPlotApi, mockedLogoutApi, mockedBuildingApi);
	});

    it('should set inGameMusic variables when playInGameMusic is called', () => {
        sut.playInGameMusic();
        expect(sut.inGameMusic.src).toBeDefined();
        expect(sut.inGameMusic.loop).toBeTruthy();
        sut.inGameMusic.pause();
    });

    it('should set cow src in animalAudio when playAnimalSound is called', () => {
        const ANIMAL_COW_ID: number = 1;
        const SRC: string = "http://localhost:9876/assets/audio/Cow_Sound.wav";

        sut.playAnimalSound(ANIMAL_COW_ID);
        expect(sut.animalAudio.src).toBe(SRC);
        sut.animalAudio.pause();
    });

    it('should set chicken src in animalAudio when playAnimalSound is called', () => {
        const ANIMAL_CHICKEN_ID: number = 2;
        const SRC: string = "http://localhost:9876/assets/audio/Chicken_Sound.mp3";

        sut.playAnimalSound(ANIMAL_CHICKEN_ID);
        expect(sut.animalAudio.src).toBe(SRC);
        sut.animalAudio.pause();
    });

    it('should set goat src in animalAudio when playAnimalSound is called', () => {
        const ANIMAL_GOAT_ID: number = 3;
        const SRC: string = "http://localhost:9876/assets/audio/Goat_Sound.wav";

        sut.playAnimalSound(ANIMAL_GOAT_ID);
        expect(sut.animalAudio.src).toBe(SRC);
        sut.animalAudio.pause();
    });

    it('should resetPurchaseId reset purchasePlant, purchaseAnimal & wantToPurchase', () => {
      sut.resetPurchaseId();
      expect(sut.purchasePlant).toBeNull();
      expect(sut.purchaseAnimal).toBeNull();
      expect(sut.wantToPurchase).toBeFalsy();
    });

  it('should prepareFarm preparePlots', () => {
        mockedFarmApi.getFarm.and.returnValue(Promise.resolve(FARM));
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

    it('should set timers when setTimers is called', () => {
        sut.setTimers();
        expect(sut.growTimer).toBeDefined();
        expect(sut.waterTimer).toBeDefined();
    });

  it('should set current farm model', () => {
      sut.waterSourceTypes = WATERSOURCES;
      sut.preparePlots(FARM);
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

  it('should set variables when handleAnimalsResponse is called', () => {
    sut.handleAnimalsResponse(ANIMAL_RESPONSE_MODEL);
    expect(sut.animals).toBe(ANIMAL_RESPONSE_MODEL);
    expect(sut.animalTypes).toBe(ANIMAL_RESPONSE_MODEL.animals);
  });

  it('should harvestPlantFromPlot harvest plant on plot', () => {
      sut.activePlot = EMPTY_PLOT_MODEL;
        mockedPlotApi.harvest.and
          .returnValue(Promise.resolve(EMPTY_PLOT_MODEL));

        sut.harvestPlantFromPlot();
        expect(sut.harvestModal).toBeFalsy();
        expect(mockedPlotApi.harvest).toHaveBeenCalled();
  });

  it('should sellProductFromPlot sell the product on plot', () => {
        sut.activePlot = PLOT_WITH_PLANT_MODEL;
        mockedPlotApi.sellProduct.and.returnValue(Promise.resolve(PLOT_WITH_PLANT_MODEL));

        sut.sellProductFromPlot();
        expect(sut.sellProductModal).toBeFalsy();
        expect(mockedPlotApi.sellProduct).toBeDefined();
  });

  it('should toggleAnimalShop toggle animal shop', () => {
      sut.toggleAnimalShop();
      expect(sut.showAnimalshop).toBeTruthy();
      expect(sut.showPlantshop).toBeFalsy();
  });

  it('should togglePlantShop toggle plant shop', () => {
      sut.togglePlantShop();
      expect(sut.showPlantshop).toBeTruthy();
      expect(sut.showAnimalshop).toBeFalsy();
  });

  it('should openPlotShop open shop for plot', () => {
      sut.openPlotShop(PRICE);
      expect(sut.purchasePlot).toBeTruthy();
      expect(sut.plotPrice).toBeDefined(PRICE);
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
      expect(PLOT_WITH_PLANT_MODEL.status).toEqual(STATUS_DEHYDRATED);
  });

  it('should normalPlantAction be an action when normal status', () => {
      sut.plantTypes = PLANTS;
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

  it('should getGrowTime to receive grow time', () => {
      sut.plantTypes = PLANT_RESPONSE_MODEL.plants;
      expect(sut.getGrowTime(PLANT_ID)).toBe(PLANT.growingTime);
  });

  it('should return 0 when getGrowTIme gets unkown plantID', () => {
      sut.plantTypes = PLANT_RESPONSE_MODEL.plants;
      expect(sut.getGrowTime(5)).toBe(0);
  });

  it('should getWaterUsage to receive water usage', () => {
    sut.plantTypes = PLANT_RESPONSE_MODEL.plants;
    expect(sut.getWaterUsage(PLANT_ID)).toBe(PLANT.waterUsage);
  });

  it('should return 0 when getWaterUsage gets unkown plantID', () => {
      sut.plantTypes = PLANT_RESPONSE_MODEL.plants;
      expect(sut.getWaterUsage(5)).toBe(0);
  });

  it('should getMaximumWater to receive maximum water', () => {
    sut.plantTypes = PLANT_RESPONSE_MODEL.plants;
    expect(sut.getMaximumWater(PLANT_ID)).toBe(PLANT.maximumWater);
  });

  it('should return 0 when getMaximumWater gets unkown plantID', () => {
      sut.plantTypes = PLANT_RESPONSE_MODEL.plants;
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
        .returnValue(Promise.resolve(ANIMAL));

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
    sut.setpurchaseAnimal(ANIMAL);
    expect(sut.purchaseAnimal).toBeDefined(ANIMAL);
    expect(sut.purchasePlant).toBeNull();
    expect(sut.wantToPurchase).toBeTruthy();
    expect(sut.showAnimalshop).toBeFalsy();
  });

  it('should set variabeles when handleAnimalClick is called with normal status', () => {
    PLOT_WITH_PLANT_MODEL.status = "Normal";
    PLOT_WITH_PLANT_MODEL.harvestable = true;
    sut.handleAnimalClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.sellProductModal).toBeTruthy();
  });

  it('should set variabeles when handleAnimalClick is called with dehydrated status', () => {
    const EXPECTED_POPUP_TEXT: string = "This plant is dehydrated!";

    PLOT_WITH_PLANT_MODEL.status = STATUS_DEHYDRATED;
    sut.handleAnimalClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestPopUpText).toBe(EXPECTED_POPUP_TEXT);
  });

  it('should set variabeles when handleAnimalClick is called with dead status', () => {
    PLOT_WITH_PLANT_MODEL.status = STATUS_DEAD;
    sut.handleAnimalClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.animalRemoveModal).toBeTruthy();
  });

  it('should call apis when handleWaterSourceClick is called', () => {
      sut.waterSourceTypes = WATERSOURCES;
      sut.handleWaterSourceClick(PLOT_WITH_PLANT_MODEL);
      expect(mockedPlotApi.editWater).toHaveBeenCalled();
      expect(mockedInventoryApi.editInventoryWater).toHaveBeenCalled();
  });

  it('should set variables when handleWaterSourceClick is called', () => {
    sut.waterSourceTypes = WATERSOURCES;
    sut.handleWaterSourceClick(PLOT_WITH_PLANT_MODEL);
    expect(PLOT_WITH_PLANT_MODEL.waterAvailable).toBe(0);
    expect(PLOT_WITH_PLANT_MODEL.maximumWater).toBeDefined();
  });

  it('should set harvestPopUpText on null when handlePlantClick is called with normal plot', () => {
    PLOT_WITH_PLANT_MODEL.harvestable = true;
    PLOT_WITH_PLANT_MODEL.status = "Normal";
    sut.handlePlantClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestPopUpText).toBeNull();
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestModal).toBeTruthy();
  });

  it('should set harvestPopUpText on This plant is dehydrated! when handlePlantClick is called with dehydrated plot', () => {
    PLOT_WITH_PLANT_MODEL.harvestable = true;
    PLOT_WITH_PLANT_MODEL.status = STATUS_DEHYDRATED;
    sut.handlePlantClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestPopUpText).toBe("This plant is dehydrated!");
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestModal).toBeTruthy();
  });

  it('should set harvestPopUpText on This plant is dead! when handlePlantClick is called with dead plot', () => {
    PLOT_WITH_PLANT_MODEL.harvestable = true;
    PLOT_WITH_PLANT_MODEL.status = STATUS_DEAD;
    sut.handlePlantClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestPopUpText).toBe("This plant is dead!");
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestModal).toBeTruthy();
  });

  it('should set harvestPopUpText on null when harvestPlantClick is called with normal plot', () => {
    PLOT_WITH_PLANT_MODEL.status = "Normal";
    sut.harvestPlantClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestPopUpText).toBeNull();
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestModal).toBeTruthy();
  });

  it('should set harvestPopUpText on This plant is dehydrated! when harvestPlantClick is called with dehydrated plot', () => {
    PLOT_WITH_PLANT_MODEL.status = STATUS_DEHYDRATED;
    sut.harvestPlantClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestPopUpText).toBe("This plant is dehydrated!");
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestModal).toBeTruthy();
  });

  it('should set harvestPopUpText on This plant is dead! when harvestPlantClick is called with dead plot', () => {
    PLOT_WITH_PLANT_MODEL.status = STATUS_DEAD;
    sut.harvestPlantClick(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestPopUpText).toBe("This plant is dead!");
    expect(sut.activePlot).toBe(PLOT_WITH_PLANT_MODEL);
    expect(sut.harvestModal).toBeTruthy();
  });

  it('should call editWater in PlotApi when giveWater is called', () => {
    sut.giveWater(PLOT_WITH_PLANT_MODEL);
    expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should set variables when handlePlantsResponse is called', () => {
      sut.handlePlantsResponse(PLANT_RESPONSE_MODEL);
      expect(sut.plants).toBe(PLANT_RESPONSE_MODEL);
      expect(sut.plantTypes).toBe(PLANT_RESPONSE_MODEL.plants);
  });

  it('should call getAllWaterSources in BuildingApi when getWaterSources is called', () => {
      sut.getWaterSources();
      expect(mockedBuildingApi.getAllWaterSources).toHaveBeenCalled();
  });

  it('should set waterSourceTypes when handleWaterSourceResponse is called', () => {
      sut.handleWaterSourceResponse(WATERSOURCE_RESPONSE_MODEL);
      expect(sut.waterSourceTypes).toBe(WATERSOURCE_RESPONSE_MODEL.waterSources);
  });

  it('should update waterAvailable in plot when handleWaterSourceWater is called', () => {
    let oldAmount = PLOT_WITH_PLANT_MODEL.waterAvailable;
    sut.waterSourceTypes = WATERSOURCES;
    sut.handleWaterSourceWater(PLOT_WITH_PLANT_MODEL, sut);
    expect(PLOT_WITH_PLANT_MODEL.waterAvailable).toBeGreaterThan(oldAmount);
  });

  it('should call editWater in PlotApi when handleAnimalWater is called with a plot with Normal status', () => {
    PLOT_WITH_ANIMAL_MODEL.status = STATUS_NORMAL;
    sut.animalTypes = ANIMALS;
    sut.handleAnimalWater(PLOT_WITH_ANIMAL_MODEL, sut);
    expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should call editWater in PlotApi when handleAnimalWater is called with a plot with Dehydrated status', () => {
    PLOT_WITH_ANIMAL_MODEL.status = STATUS_DEHYDRATED;
    sut.animalTypes = ANIMALS;
    sut.handleAnimalWater(PLOT_WITH_ANIMAL_MODEL, sut);
    expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should call updateStatus in plotApi when dehydrateAnimal is called', () => {
    sut.dehydrateAnimal(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.updateStatus).toHaveBeenCalled();
  });

  it('should set status on Dehydrated when dehydrateAnimal is called', () => {
    sut.dehydrateAnimal(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(PLOT_WITH_ANIMAL_MODEL.status).toBe(STATUS_DEHYDRATED);
  });

  it('should call editWater in PlotApi when dehydratedPlantAction is called', () => {
    sut.plantTypes = PLANTS;
    sut.dehydratedPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should call updateStatus in PlotApi when dehydratedPlantAction is called with plant with no water left', () => {
    PLOT_WITH_PLANT_MODEL.waterAvailable = 0;
    sut.plantTypes = PLANTS;
    sut.dehydratedPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.updateStatus).toHaveBeenCalledWith(PLOT_WITH_PLANT_MODEL.id, STATUS_DEAD);
  });

  it('should restore status to Normal when dehydratedPlantAction is called with a plant with enoough water', () => {
    PLOT_WITH_PLANT_MODEL.waterAvailable = 9999;
    PLOT_WITH_PLANT_MODEL.status = STATUS_DEHYDRATED;
    sut.plantTypes = PLANTS;
    sut.dehydratedPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
    expect(PLOT_WITH_PLANT_MODEL.status).toBe(STATUS_NORMAL)
  });

  it('should call editWater in PlotApi when dehydratedAnimalAction is called', () => {
    sut.animalTypes = ANIMALS;
    sut.dehydratedAnimalAction(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should call updateStatus in PlotApi when dehydratedAnimalAction is called with plant with no water left', () => {
    PLOT_WITH_ANIMAL_MODEL.waterAvailable = 0;
    sut.animalTypes = ANIMALS;
    sut.dehydratedAnimalAction(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.updateStatus).toHaveBeenCalledWith(PLOT_WITH_ANIMAL_MODEL.id, STATUS_DEAD);
  });

  it('should restore status to Normal when dehydratedAnimalAction is called with a plant with enough water', () => {
    PLOT_WITH_ANIMAL_MODEL.waterAvailable = 9999;
    PLOT_WITH_ANIMAL_MODEL.status = STATUS_DEHYDRATED;
    sut.animalTypes = ANIMALS;
    sut.dehydratedAnimalAction(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(PLOT_WITH_ANIMAL_MODEL.status).toBe(STATUS_NORMAL)
  });

  it('should lower waterAvailable in given plot when normalPlantAction is called', () => {
    sut.plantTypes = PLANTS;
    let oldWaterAvailable: number = PLOT_WITH_PLANT_MODEL.waterAvailable;
    sut.normalPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
    expect(PLOT_WITH_PLANT_MODEL.waterAvailable).toBeLessThan(oldWaterAvailable);
  });

  it('should call editWater in PlotApi when normalPlantAction is called', () => {
    sut.plantTypes = PLANTS;
    sut.normalPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should call updateStatus in PlotApi when normalPlantAction is called', () => {
    PLOT_WITH_PLANT_MODEL.waterAvailable = 1;
    sut.plantTypes = PLANTS;
    sut.normalPlantAction(PLOT_WITH_PLANT_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.updateStatus).toHaveBeenCalled();
  });

  it('should lower waterAvailable in given plot when normalAnimalAction is called', () => {
    sut.animalTypes = ANIMALS;
    let oldWaterAvailable: number = PLOT_WITH_ANIMAL_MODEL.waterAvailable;
    sut.normalAnimalAction(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(PLOT_WITH_ANIMAL_MODEL.waterAvailable).toBeLessThan(oldWaterAvailable);
  });

  it('should call editWater in PlotApi when normalPlantAction is called', () => {
    sut.animalTypes = ANIMALS;
    sut.normalAnimalAction(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.editWater).toHaveBeenCalled();
  });

  it('should call updateStatus in PlotApi when normalPlantAction is called', () => {
    PLOT_WITH_ANIMAL_MODEL.waterAvailable = 1;
    sut.animalTypes = ANIMALS;
    sut.normalAnimalAction(PLOT_WITH_ANIMAL_MODEL, WATER_USAGE, sut);
    expect(mockedPlotApi.updateStatus).toHaveBeenCalled();
  });

  it('should return correct ProductionTime from an Animal when getProductionTime is called', () => {
    sut.animalTypes = ANIMALS;
    let productionTime: number = sut.getProductionTime(ANIMAL.id);
    expect(productionTime).toBe(ANIMAL.productionTime);
  });

  it('should return 0 when getProductionTime is called with an invalid id', () => {
    sut.animalTypes = ANIMALS;
    let productionTime: number = sut.getProductionTime(293874);
    expect(productionTime).toBe(0);
  });

  it('should return correct waterUsage from given animalId when getAnimalWaterUsage is called', () => {
    sut.animalTypes = ANIMALS;
    let waterUsage: number = sut.getAnimalWaterUsage(ANIMAL.id);
    expect(waterUsage).toBe(ANIMAL.waterUsage);
  });

  it('should return 0 when getAnimalWaterUsage is called with an invalid id', () => {
    sut.animalTypes = ANIMALS;
    let waterUsage: number = sut.getAnimalWaterUsage(1298374);
    expect(waterUsage).toBe(0);
  });

  it('should return correct maximumWater from given watersourceId when getMaximumSourceWater is called', () => {
    sut.waterSourceTypes = WATERSOURCES
    let maximumWater: number = sut.getMaximumSourceWater(WATERSOURCE.id);
    expect(maximumWater).toBe(WATERSOURCE.maximumWater);
  });

  it('should return 0 when getMaximumSourceWater is called with an invalid id', () => {
    sut.waterSourceTypes = WATERSOURCES
    let maximumWater: number = sut.getMaximumSourceWater(932487597324);
    expect(maximumWater).toBe(0);
  });

  it('should getMaximumAnimalWater to receive maximum water for animal', () => {
    sut.animalTypes = ANIMALS;
    expect(sut.getMaximumAnimalWater(ANIMAL_ID)).toBe(ANIMAL.maximumWater);
  });

  it('should getWaterYield to receive water yield', () => {
    sut.waterSourceTypes = WATERSOURCE_RESPONSE_MODEL.waterSources;
    expect(sut.getWaterYield(WATERSOURCE.id)).toBe(WATERSOURCE.waterYield);
  });

  it('should call placePlantOnPlot in PlotApi when handlePurchase is called when purchasePlant is defined', () => {
    sut.purchasePlant = PLANT;
    sut.handlePurchase();
    expect(mockedPlotApi.placePlantOnPlot).toHaveBeenCalled();
  });

  it('should call placeAnimalOnPlot in PlotApi when handlePurchase is called when purchaseAnimal is defined', () => {
    sut.purchaseAnimal = ANIMAL;
    sut.handlePurchase();
    expect(mockedPlotApi.placeAnimalOnPlot).toHaveBeenCalled();
  });
});
