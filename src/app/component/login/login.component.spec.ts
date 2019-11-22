import { TestBed } from '@angular/core/testing'; 
import { LoginApi } from '../../api/login.api';
import { LoginComponent } from '../../component/login/login.component';
import { LoginModel } from 'src/app/model/login.model';
import { UserModel } from 'src/app/model/user.model';
import { TokenModel } from "src/app/model/token.model";
import { LoginResponseModel } from 'src/app/model/login-response.model';
import { FormBuilder } from '@angular/forms';
describe('LoginComponent', () => {
    let mockedLoginApi;
    let sut;

    beforeEach(() => {
        mockedLoginApi = jasmine.createSpyObj("LoginApi", ["query"]);
        mockedLoginApi.query.and.returnValue(new LoginResponseModel(new UserModel(), "1234"));
        
        TestBed.configureTestingModule({
			declarations: [LoginComponent],
			providers: [{ provide: LoginApi, useValue: mockedLoginApi }],
		});
        sut = new LoginComponent(new FormBuilder(), mockedLoginApi);
	});

    it('should call LoginApi', () => {
        sut.onSubmit(new LoginModel("", ""));
		expect(mockedLoginApi.query).toHaveBeenCalled();
    });

    it("should declare currentToken in TokenModel", () => {
        TokenModel.setCurrentToken("1234");
        expect(TokenModel.currentToken).toBe("1234");
    });

    it("should declare token", () => {
        TokenModel.currentToken = "1234";
        sut.setToken();
        expect(sut.token).toBe("1234");
    });
});