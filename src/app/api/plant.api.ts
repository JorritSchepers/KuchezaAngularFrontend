import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PlantResponseModel } from '../model/plant-response.model';

@Injectable()
export class PlantApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private PLANT_URL = 'http://localhost:8088/plant';
	private token: String = localStorage.getItem('currentUser');

	constructor(private http?: HttpClient) { }

  async getAllPlants(): Promise<PlantResponseModel> {
    const data: PlantResponseModel = await this.http.get<PlantResponseModel>(this.PLANT_URL + "?token=" + this.token,
        {headers: this.headers}).toPromise();
    return data;
  }

  async deletePlant(plantIDToDelete: number, plantIDToReplaceWith: number): Promise<PlantResponseModel> {
    const data: PlantResponseModel = await this.http.delete<PlantResponseModel>(this.PLANT_URL + "/" + plantIDToDelete + "/" 
        + plantIDToReplaceWith +  "?token=" + this.token, {headers: this.headers}).toPromise();
    return data;
  }
}
  