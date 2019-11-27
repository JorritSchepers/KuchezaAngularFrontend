import { TestBed } from '@angular/core/testing';
import { FarmComponent } from './farm.component';
import { FarmModel } from 'src/app/model/farm.model';
import { PlotModel } from 'src/app/model/plot.model';
import { FarmApi } from 'src/app/api/farm.api';

describe('FarmComponent', () => {
    let mockedFarmApi: any;
    let sut: FarmComponent;

    beforeEach(() => {
        mockedFarmApi = jasmine.createSpyObj("FarmApi", ["query"]);
        mockedFarmApi.query.and.returnValue(new FarmModel(Array<PlotModel>(3), -1, -1));

        TestBed.configureTestingModule({
			declarations: [FarmComponent],
			providers: [{ provide: FarmApi, useValue: mockedFarmApi }],
		});
        sut = new FarmComponent(mockedFarmApi);
	});

    it('should call FarmApi', () => {
        sut.getFarm();
		    expect(mockedFarmApi.query).toHaveBeenCalled();
    });
});
