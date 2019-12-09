import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { LoginApi } from 'src/app/api/login.api';
import { LoginResponseModel } from 'src/app/model/login-response.model';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: String;
  password: String;
  loginForm: any;

  constructor(private titleService:Title, private formBuilder: FormBuilder, private loginApi: LoginApi, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.titleService.setTitle("Kucheza");
  }

  loginUser(loginModel: LoginModel): void {
    this.loginApi.login(new LoginModel(loginModel.email, loginModel.password)).then(response => this.handleLoginResponse(response))
          .catch(any => this.handleLoginException(any));
    this.loginForm.reset();
  }

  private handleLoginResponse(response: LoginResponseModel): void {
    localStorage.setItem('currentUser', response.token);
    console.warn(response.user.admin);
    if (response.user.admin) {
      this.router.navigateByUrl('/admin');
      return;
    }
    this.router.navigateByUrl('/farm');
  }

  private handleLoginException(exception: any): void {
    console.warn("Exception:", exception);
  }
}
