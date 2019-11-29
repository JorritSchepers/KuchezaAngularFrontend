import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { PlantResponseModel } from '../model/plant-response.model';

@Injectable()
export class PlantApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private PLANT_URL = 'http://localhost:8088/plant';

	constructor(private http?: HttpClient) { }

  async query(): Promise<PlantResponseModel> {
    const data: PlantResponseModel = await this.http.get<PlantResponseModel>(this.PLANT_URL + "?token=" + TokenModel.currentToken,
    {headers: this.headers}).toPromise();
    return data;
  }
}
