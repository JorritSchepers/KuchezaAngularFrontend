import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { HttpHeaders } from '@angular/common/http';
import { LogoutResponseModel } from '../model/logout-response.model';

@Injectable()
export class LogoutApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private LOGOUT_URL = 'http://localhost:8088/account/logout';

	constructor(private http: HttpClient) { }

	async logout(): Promise<LogoutResponseModel> {
    const data: LogoutResponseModel = await this.http.post<LogoutResponseModel>(this.LOGOUT_URL + "?token=" + TokenModel.currentToken,
		{headers: this.headers}).toPromise();
    return data;
  }
}
