import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { LoginApi } from 'src/app/api/login.api';
import { LoginResponseModel } from 'src/app/model/login-response.model';
import { Title } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: String;
  password: String;
  loginForm: any;

  constructor(private cookieService: CookieService,private titleService:Title, private formBuilder: FormBuilder, private loginApi: LoginApi) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.titleService.setTitle("Kucheza");
    cookieService.delete('currentUser');
  }

  loginUser(loginModel: LoginModel): void {
    this.loginApi.login(new LoginModel(loginModel.email, loginModel.password)).then(response => this.handleLoginResponse(response))
          .catch(any => this.handleLoginException(any));
    this.loginForm.reset();
  }

  private handleLoginResponse(response: LoginResponseModel): void {
    this.cookieService.set('currentUser', response.token);
    if (response.user.admin) {
      window.location.pathname = '/admin'
      return;
    }
    window.location.pathname = '/farm'
  }

  private handleLoginException(exception: any): void {
    console.warn("Exception:", exception);
  }
}
