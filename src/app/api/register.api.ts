import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterResponseModel } from '../model/register-response.model';
import { UserModel } from '../model/user.model';
import { HttpHeaders } from '@angular/common/http';
import { ConstantsModel } from './constants.model';

@Injectable()
export class RegisterApi {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private constants = new ConstantsModel();
	private REGISTER_URL = this.constants.BACK_END_URL+'account/register';

	constructor(private http: HttpClient) { }

	async registerUser(userModel: UserModel): Promise<RegisterResponseModel> {
    const data: RegisterResponseModel = await this.http.post<RegisterResponseModel>(this.REGISTER_URL, JSON.stringify(userModel),
    {headers: this.headers}).toPromise();
    return data;
  }
}
