import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { CurrentFarmModel } from '../model/current-farm.model';

@Injectable()
export class FarmApi {
  httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
	};

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	farmUrl = 'http://localhost:8088/farm';

	constructor(private http?: HttpClient) { }

  async query(): Promise<FarmModel> {
    try {
      const data: FarmModel = await this.http.get<FarmModel>(this.farmUrl + "?token=" + TokenModel.currentToken,
      {headers: this.headers}).toPromise();
      console.warn("PlantResponseModel: ", data);
      CurrentFarmModel.setFarmID(data.farmID);
  		CurrentFarmModel.setOwnerID(data.ownerID);
  		CurrentFarmModel.setPlots(data.plots);
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }
}
