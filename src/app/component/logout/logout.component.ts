import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private logoutApi: LogoutApi, private router: Router){

  }

  logout(): void {
    this.logoutApi.query();
    this.router.navigateByUrl('/login');
  }
}
