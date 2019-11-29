import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterResponse } from '../model/register-response.model';
import { UserModel } from '../model/user.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegisterApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private REGISTER_URL = 'http://localhost:8088/account/register';

	constructor(private http: HttpClient) { }

	public async registerUser(userModel: UserModel): Promise<RegisterResponse> {
    try {
      const data: RegisterResponse = await this.http.post<RegisterResponse>(this.REGISTER_URL, JSON.stringify(userModel),
      {headers: this.headers}).toPromise();
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }
}
