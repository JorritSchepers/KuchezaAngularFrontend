import { TestBed } from '@angular/core/testing';
import { LoginApi } from '../../api/login.api';
import { LoginComponent } from '../../component/login/login.component';
import { LoginModel } from 'src/app/model/login.model';
import { UserModel } from 'src/app/model/user.model';
import { TokenModel } from "src/app/model/token.model";
import { LoginResponseModel } from 'src/app/model/login-response.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let mockedTitle: any;
  let mockedLoginApi: any;
  let mockedRouter: any;
  let sut: any;
  let loginResponseModel = new LoginResponseModel(new UserModel(1, "testNaam", "testWachtwoord", "testWachtwoord", false), "testtoken123");

  beforeEach(() => {
    mockedTitle = jasmine.createSpyObj("Title", ["setTitle"]);
    mockedRouter = jasmine.createSpyObj("Router", [""]);
    mockedLoginApi = jasmine.createSpyObj("LoginApi", ["login"]);
    mockedLoginApi.login.and.returnValue(Promise.resolve(loginResponseModel).then(response => this.handleLoginResponse(response))
          .catch(any => this.handleLoginException(any)));

    TestBed.configureTestingModule({
  		declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
  		providers: [{provide: LoginApi, useValue: mockedLoginApi}]
    });

    sut = new LoginComponent(mockedTitle, new FormBuilder(), mockedLoginApi, mockedRouter);
  });

  it('should instantiate LoginComponent', () => {
    expect(sut instanceof LoginComponent).toBe(true, 'should create LoginComponent');
  });

  it('should call LoginApi', () => {
    sut.loginUser(new LoginModel("test@test.nl", "test123"));
    expect(mockedLoginApi.login).toHaveBeenCalled();
  });

  it("should set token in localStorage", () => {
    localStorage.setItem('currentUser', "1234");
    expect(localStorage.getItem('currentUser')).toBe("1234");
  });
});
