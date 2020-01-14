import { TestBed } from '@angular/core/testing';
import { LoginApi } from '../../api/login.api';
import { LoginComponent } from '../../component/login/login.component';
import { LoginModel } from 'src/app/model/login.model';
import { UserModel } from 'src/app/model/user.model';
import { LoginResponseModel } from 'src/app/model/login-response.model';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

const USER_MODEL: UserModel = new UserModel(1, "testNaam", "testWachtwoord", "testWachtwoord", false);
const LOGIN_REPONSE_MODEL: LoginResponseModel = new LoginResponseModel(USER_MODEL, "testtoken123");
const LOGIN_MODEL: LoginModel = new LoginModel("test@test.nl", "test123");

describe('LoginComponent', () => {
  let mockedTitle: any;
  let mockedLoginApi: any;
  let mockedCookieService: any;
  let sut: LoginComponent;

  beforeEach(() => {
    mockedTitle = jasmine.createSpyObj("Title", ["setTitle"]);
    mockedLoginApi = jasmine.createSpyObj("LoginApi", ["login"]);

    mockedCookieService = jasmine.createSpyObj("CookieService", ["get", "delete"]);
    mockedCookieService.get.and.returnValue("1234");

    mockedLoginApi.login.and.returnValue(Promise.resolve(LOGIN_REPONSE_MODEL));

    TestBed.configureTestingModule({
  		declarations: [LoginComponent],
  		providers: [{provide: CookieService, useClass: mockedCookieService},
                  {provide: LoginApi, useClass: mockedLoginApi}]
    });
    sut = new LoginComponent(mockedCookieService, mockedTitle, new FormBuilder(), mockedLoginApi);
  });

  it('should loginUser handleLoginResponse', () => {
    sut.loginUser(LOGIN_MODEL);
    expect(mockedLoginApi.login).toHaveBeenCalled();
  });

  it('should cookieService get correct token', () => {
    sut.loginUser(LOGIN_MODEL);
    expect(mockedCookieService.get('currenUser')).toBe('1234');
  });
});
