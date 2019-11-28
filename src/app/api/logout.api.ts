import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { HttpHeaders } from '@angular/common/http';
import { LogoutResponseModel } from '../model/logout-response.model';

@Injectable()
export class LogoutApi {
	httpOptions = {
	   headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
  };

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	logoutUrl = 'http://localhost:8088/account/logout';

	constructor(private http: HttpClient) { }

	query() {
		return this.http.post<LogoutResponseModel>(this.logoutUrl + "?token=" + TokenModel.currentToken, {headers: this.headers})
		.subscribe(data => this.handleLogoutResponse(data));
	}

	private handleLogoutResponse(response: LogoutResponseModel): void {
		console.warn("LogoutResponse", response);
  }
}
