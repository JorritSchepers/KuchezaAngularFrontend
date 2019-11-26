import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { TokenModel } from '../../model/token.model';
import { LogoutApi } from 'src/app/api/logout.api';

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private logoutApi: LogoutApi){

  }

  logout(): void {
    this.logoutApi.query();
  }
}
