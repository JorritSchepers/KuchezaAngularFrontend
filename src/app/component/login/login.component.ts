import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { TokenModel } from '../../model/token.model';
import { LoginApi } from 'src/app/api/login.api';
import { LoginResponseModel } from 'src/app/model/login-response.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: String;
  password: String;
  loginForm: any;
  token: String;

  constructor(private formBuilder: FormBuilder, private loginApi: LoginApi, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.token = "Click here to see your token!";
  }

  loginUser(loginModel: LoginModel): void {
    this.loginApi.login(new LoginModel(loginModel.email, loginModel.password)).then(response => this.handleLoginResponse(response))
          .catch(any => this.handleLoginException(any));
    this.loginForm.reset();
  }

  private handleLoginResponse(response: LoginResponseModel): void {
    TokenModel.setCurrentToken(response.token);
    this.router.navigateByUrl('/farm');
  }

  private handleLoginException(exception: any): void {
    console.warn("Exception:", exception);
  }

  setToken(): void {
    this.token = TokenModel.currentToken;
  }
}