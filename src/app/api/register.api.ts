import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterResponse } from '../model/register-response.model';
import { UserModel } from '../model/user.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegisterApi {
	httpOptions = {
	   headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
  };

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	registerUrl = 'http://localhost:8088/account/register';

	constructor(private http: HttpClient) { }

	query(userModel: UserModel) {
		console.warn('Sending request to: ', this.registerUrl, "with dto: ", JSON.stringify(userModel), "?");
		return this.http.post<RegisterResponse>(this.registerUrl, JSON.stringify(userModel), {headers: this.headers})
		.subscribe(data => this.handleRegisterResponse(data));
	}

	private handleRegisterResponse(response: RegisterResponse): void {
		console.warn("RegisterResponse", RegisterResponse);
  }
}
