import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { TokenModel } from '../../model/token.model';
import { LoginApi } from 'src/app/api/login.api';

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

  login(loginModel: LoginModel): void {
    this.loginApi.query(new LoginModel(loginModel.email, loginModel.password));
    this.loginForm.reset();
  }

  setToken(): void {
    this.token = TokenModel.currentToken;
  }
}