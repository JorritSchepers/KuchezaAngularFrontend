import { Component, Directive, Injectable } from '@angular/core';
import { LoginApi } from "src/app/api/login.api";
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';

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

  constructor(private formBuilder: FormBuilder, private loginApi: LoginApi) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onSubmit(loginData) {
    // console.warn('You tried loggin in', loginData);
    let response = this.loginApi.query(new LoginModel(loginData.email, loginData.password));
    this.loginForm.reset();
  }
}