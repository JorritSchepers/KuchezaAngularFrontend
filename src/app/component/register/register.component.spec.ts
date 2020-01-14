import { TestBed } from '@angular/core/testing';
import { RegisterApi } from '../../api/register.api';
import { RegisterComponent } from '../../component/register/register.component';
import { RegisterModel } from 'src/app/model/register.model';
import { RegisterResponseModel } from 'src/app/model/register-response.model';
import { UserModel } from 'src/app/model/user.model';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

const REGISTER_REPONSE_MODEL: RegisterResponseModel = new RegisterResponseModel(new UserModel(-1, "", "", ""), "1234");
const REGISTER_MODEL: RegisterModel = new RegisterModel("Test", "test@test.nl", "Test123", "Test123");

describe('RegisterComponent', () => {
	let mockedTitle: any;
	let mockRegisterApi: any;
	let mockedCookieService: any;
	let sut: RegisterComponent;

	beforeEach(() => {
    mockedTitle = jasmine.createSpyObj("Title", ["setTitle"]);
    mockRegisterApi = jasmine.createSpyObj('RegisterApi', ['registerUser']);

    mockedCookieService = jasmine.createSpyObj("CookieService", ["get", "delete"]);
    mockedCookieService.get.and.returnValue("4321");

    mockRegisterApi.registerUser.and.returnValue(Promise.resolve(REGISTER_REPONSE_MODEL));

		TestBed.configureTestingModule({
			declarations: [RegisterComponent],
			providers: [{ provide: RegisterApi, useValue: mockRegisterApi },
                  {provide: CookieService, useClass: mockedCookieService}]
		});
        sut = new RegisterComponent(mockedCookieService, mockedTitle, new FormBuilder(), mockRegisterApi);
	});

  it('should registerUser handleRegisterResponse', () => {
    sut.registerUser(REGISTER_MODEL);
    expect(mockRegisterApi.registerUser).toHaveBeenCalled();
  });

  it('should cookieService get correct token', () => {
    sut.registerUser(REGISTER_MODEL);
    expect(mockedCookieService.get('currenUser')).toBe('4321');
  });
});
