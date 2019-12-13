import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { CurrentFarmModel } from '../model/current-farm.model';
import { ConstantsModel } from './constants.model';

@Injectable()
export class FarmApi {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private constants = new ConstantsModel();
	private FARM_URL = this.constants.BACK_END_URL+'farm';
	private token: String = localStorage.getItem('currentUser');

	constructor(private http?: HttpClient) { }

  async getFarm(): Promise<FarmModel> {
    const data: FarmModel = await this.http.get<FarmModel>(this.FARM_URL + "?token=" + this.token,
    {headers: this.headers}).toPromise();
    return data;
  }
}
