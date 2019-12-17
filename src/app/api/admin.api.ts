import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllUsersModel } from '../model/all-users.model';
import { ConstantsModel } from './constants.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AdminApi {
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private constants = new ConstantsModel();
	  private ADMIN_URL = this.constants.BACK_END_URL+'admin';
	  private token: String = this.cookieService.get('currentUser');

	constructor(private cookieService: CookieService,private http?: HttpClient) { }

  async getAllNonAdminUsers(): Promise<AllUsersModel> {
    const data: AllUsersModel = await this.http.get<AllUsersModel>(this.ADMIN_URL + "/users?token=" + this.token,
    {headers: this.headers}).toPromise();
    return data;
  }

  async deleteUser(userID: number): Promise<AllUsersModel> {
    const data: AllUsersModel = await this.http.delete<AllUsersModel>(this.ADMIN_URL + "/user/" + userID + "?token=" + this.token,
    {headers: this.headers}).toPromise();
    return data;
  }
}
