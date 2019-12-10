import { TestBed } from '@angular/core/testing';
import { RegisterApi } from '../../api/register.api';
import { RegisterComponent } from '../../component/register/register.component';
import { RegisterModel } from 'src/app/model/register.model';
import { RegisterResponseModel } from 'src/app/model/register-response.model';
import { UserModel } from 'src/app/model/user.model';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
	let mockedTitle: any;
	let mockRegisterApi: any;
	let mockRouter: any;
	let sut: RegisterComponent;
	let registerResponseModel = new RegisterResponseModel(new UserModel(-1, "", "", ""), "1234");

	beforeEach(() => {
		mockedTitle = jasmine.createSpyObj("Title", ["setTitle"]);
		mockRegisterApi = jasmine.createSpyObj('RegisterApi', ['registerUser']);
		mockRouter = jasmine.createSpyObj('Router', ['query']);
		mockRegisterApi.registerUser.and.returnValue(Promise.resolve(registerResponseModel).then(response => this.handleRegisterResponse(response))
          .catch(any => this.handleRegisterException(any)));

		TestBed.configureTestingModule({
			declarations: [RegisterComponent],
			imports: [
        FormsModule,
        ReactiveFormsModule
      ],
			providers: [{ provide: RegisterApi, useValue: mockRegisterApi }]
		});

    sut = new RegisterComponent(mockedTitle, new FormBuilder(), mockRegisterApi, mockRouter);
	});

	it('should instantiate RegisterComponent', () => {
    expect(sut instanceof RegisterComponent).toBe(true, 'should create RegisterComponent');
  });

  it('should call RegisterApi', () => {
    sut.registerUser(new RegisterModel("Test", "test@test.nl", "Test123", "Test123"));
    expect(mockRegisterApi.registerUser).toHaveBeenCalled();
  });
});
