import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllUsersModel } from '../model/all-users.model';

@Injectable()
export class AdminApi {
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private ADMIN_URL = 'http://localhost:8088/admin';
	token: String = localStorage.getItem('currentUser');

	constructor(private http?: HttpClient) { }

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