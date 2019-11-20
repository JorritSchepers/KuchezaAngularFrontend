import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../dto/logindto';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginApi {
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
	  };
	loginUrl = 'http://localhost:8088/account/login';

	constructor(private http: HttpClient) { }

	query(loginDTO: LoginDTO) {
		console.warn('Sending request to: ', this.loginUrl, "with dto: ", loginDTO, "?");
		return this.http.post(this.loginUrl, loginDTO, this.httpOptions);
	}
}