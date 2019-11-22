import { Component } from '@angular/core';
import { LoginApi } from "src/app/api/login.api";
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { TokenModel } from '../../model/token.model';
import { LoginResponseModel } from 'src/app/model/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: String;
  password: String;
  loginForm;
  token: String;

  constructor(private formBuilder: FormBuilder, private loginApi: LoginApi) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.token = "Click here to see your token!";
  }

  onSubmit(loginData: LoginModel): void {
    // console.warn('You tried loggin in', loginData);
    this.loginApi.query(new LoginModel(loginData.email, loginData.password));
    this.loginForm.reset();
  }

  setToken(): void {
    this.token = TokenModel.currentToken;
  }
}