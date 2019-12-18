// import { TestBed } from '@angular/core/testing';
// import { LoginApi } from '../../api/login.api';
// import { LoginComponent } from '../../component/login/login.component';
// import { LoginModel } from 'src/app/model/login.model';
// import { UserModel } from 'src/app/model/user.model';
// import { LoginResponseModel } from 'src/app/model/login-response.model';
// import { FormBuilder } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// const USER_MODEL: UserModel = new UserModel(1, "testNaam", "testWachtwoord", "testWachtwoord", false);
// const LOGIN_REPONSE_MODEL: LoginResponseModel = new LoginResponseModel(USER_MODEL, "testtoken123");
// const LOGIN_MODEL: LoginModel = new LoginModel("test@test.nl", "test123");

// describe('LoginComponent', () => {
//   let mockedTitle: any;
//   let mockedLoginApi: any;
//   let mockedRouter: any;
//   let sut: LoginComponent;

//   beforeEach(() => {
//     mockedTitle = jasmine.createSpyObj("Title", ["setTitle"]);
//     mockedRouter = jasmine.createSpyObj("Router", [""]);
//     mockedLoginApi = jasmine.createSpyObj("LoginApi", ["login"]);
//     mockedLoginApi.login.and.returnValue(Promise.resolve(LOGIN_REPONSE_MODEL).then(response => this.handleLoginResponse(response))
//           .catch(any => this.handleLoginException(any)));

//     TestBed.configureTestingModule({
//   		declarations: [LoginComponent],
//       imports: [
//         FormsModule,
//         ReactiveFormsModule
//       ],
//   		providers: [{provide: LoginApi, useValue: mockedLoginApi}]
//     });
//     sut = new LoginComponent(mockedTitle, new FormBuilder(), mockedLoginApi, mockedRouter);
//   });

//   it('should instantiate LoginComponent', () => {
//     expect(sut instanceof LoginComponent).toBe(true, 'should create LoginComponent');
//   });

//   it('should call LoginApi', () => {
//     sut.loginUser(LOGIN_MODEL);
//     expect(mockedLoginApi.login).toHaveBeenCalled();
//   });
// });
