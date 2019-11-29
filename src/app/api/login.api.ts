import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponseModel } from '../model/login-response.model';
import { LoginModel } from "../model/login.model";
import { HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginApi {
	private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
	private LOGIN_URL: string = 'http://localhost:8088/account/login';

	constructor(private http?: HttpClient) { }

	async login(loginModel: LoginModel): Promise<LoginResponseModel> {
		const data: LoginResponseModel = await this.http.post<LoginResponseModel>(this.LOGIN_URL, JSON.stringify(loginModel),
		{headers: this.headers}).toPromise();
		return data;
	}
}