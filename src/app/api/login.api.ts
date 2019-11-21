import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponseModel } from '../model/login-response.model';
import { LoginModel } from "../model/login.model";
import { TokenModel } from "../model/token.model";
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

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

	query(loginDTO: LoginModel) {
		console.warn('Sending request to: ', this.loginUrl, "with dto: ", JSON.stringify(loginDTO), "?");
		return this.http.post<LoginResponseModel>(this.loginUrl, JSON.stringify(loginDTO), {headers: this.headers})
		.subscribe(data => this.handleLoginResponse(data), err => this.handleLoginError(err));
	}

	private handleLoginResponse(response: LoginResponseModel): void {
		console.warn("LoginResponse: ", response);
		TokenModel.setCurrentToken(response.token);
	}

	private handleLoginError(error: HttpErrorResponse): void {
		console.warn("status code: ", error.status);
	}
}