import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { CurrentFarmModel } from '../model/current-farm.model';

@Injectable()
export class FarmApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private FARM_URL = 'http://localhost:8088/farm';

	constructor(private http?: HttpClient) { }

  async getFarm(): Promise<FarmModel> {
    const data: FarmModel = await this.http.get<FarmModel>(this.FARM_URL + "?token=" + TokenModel.currentToken,
    {headers: this.headers}).toPromise();
    return data;
  }
}
