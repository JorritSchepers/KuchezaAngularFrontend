import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LogoutResponseModel } from '../model/logout-response.model';
import { ConstantsModel } from './constants.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LogoutApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private constants = new ConstantsModel();
	private LOGOUT_URL = this.constants.BACK_END_URL+'account/logout';
	private token: String = this.cookieService.get('currentUser');

	constructor(private cookieService: CookieService,private http: HttpClient) { }

	async logout(): Promise<LogoutResponseModel> {
		const data: LogoutResponseModel = await this.http.post<LogoutResponseModel>(this.LOGOUT_URL + "?token=" + this.token,
			{headers: this.headers}).toPromise();
		return data;
	}
}
