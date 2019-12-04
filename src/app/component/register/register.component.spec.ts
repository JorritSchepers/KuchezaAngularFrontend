import { TestBed } from '@angular/core/testing';
import { RegisterApi } from '../../api/register.api';
import { RegisterComponent } from '../../component/register/register.component';
import { RegisterModel } from 'src/app/model/register.model';
import { RegisterResponseModel } from 'src/app/model/register-response.model';
import { UserModel } from 'src/app/model/user.model';
import { FormBuilder } from '@angular/forms';

describe('RegisterComponent', () => {
	let mockRegisterApi: any;
	let sut: RegisterComponent;

	beforeEach(() => {
		mockRegisterApi = jasmine.createSpyObj('RegisterApi', ['query']);
		let mockRouter = jasmine.createSpyObj('Router', ['query']);
		mockRegisterApi.query.and.returnValue(new RegisterResponseModel(new UserModel(-1, "", "", ""), "1234"));

		TestBed.configureTestingModule({
			declarations: [RegisterComponent],
			providers: [
				{ provide: RegisterApi, useValue: mockRegisterApi }
			],
		});

    sut = new RegisterComponent(new FormBuilder(), mockRegisterApi, this.mockRouter);
	});

  it('should call register', () => {
    sut.registerUser(new RegisterModel("", "", "", ""));
    expect(mockRegisterApi).toBeTruthy();
    expect(mockRegisterApi.query).toHaveBeenCalled();
    expect(sut.registerForm).toBeDefined();
  });
});
