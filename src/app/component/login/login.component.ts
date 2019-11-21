import { Component, Directive, Injectable } from '@angular/core';
import { LoginApi } from "src/app/api/login.api";
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { TokenModel } from '../../model/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  test = "test";
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

  onSubmit(loginData) {
    // console.warn('You tried loggin in', loginData);
    let response = this.loginApi.query(new LoginModel(loginData.email, loginData.password));
    this.loginForm.reset();
  }

  setToken() {
    this.token = TokenModel.currentToken;
  }
}