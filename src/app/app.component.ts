import { Component, Directive, Injectable } from '@angular/core';
import { ExpressionStatement } from '@angular/compiler';
import { LoginApi } from "src/app/api/login.api";
import { FormBuilder } from '@angular/forms';
import { LoginDTO } from './dto/logindto';
import { LoginResponse } from "./dto/loginresponse";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  test = "test";
  name: String;
  password: String;
  loginForm;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private loginApi: LoginApi) {
    this.loginForm = this.formBuilder.group({
      name: '',
      password: ''
    });
  }

  onSubmit(loginData) {
    console.warn('You tried loggin in', loginData);
    let response = this.loginApi.query(new LoginDTO(loginData.name, loginData.password));
    // console.warn("response: ", response);
    this.loginForm.reset();
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {}