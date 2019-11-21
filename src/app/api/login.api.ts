import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../dto/loginresponse';
import { LoginDTO } from "../dto/logindto";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginApi {
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
	};

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	loginUrl = 'http://localhost:8088/account/login';

	constructor(private http: HttpClient) { }

	query(loginDTO: LoginDTO) {
		console.warn('Sending request to: ', this.loginUrl, "with dto: ", JSON.stringify(loginDTO), "?");
		return this.http.post<LoginResponse>(this.loginUrl, JSON.stringify(loginDTO), {headers: this.headers})
		.subscribe(data => this.handleLoginResponse(data));
		// console.warn('Sending request to: ', this.loginUrl, "with dto: ", loginDTO, "?");
		// return this.http.post<LoginResponse>(this.loginUrl, loginDTO, this.httpOptions);
	}

	private handleLoginResponse(response: LoginResponse): void {
		console.warn("LoginResponse", LoginResponse);
	  }
}