import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { PlantResponseModel } from '../model/plant-response.model';

@Injectable()
export class PlantApi {
    httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
	};

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	plantUrl = 'http://localhost:8088/plant';

	constructor(private http?: HttpClient) { }

  public async query(): Promise<PlantResponseModel> {
    try {
      const data: PlantResponseModel = await this.http.get<PlantResponseModel>(this.plantUrl + "?token=" + TokenModel.currentToken,
      {headers: this.headers}).toPromise();
      console.warn("PlantResponseModel: ", data);
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }
}
