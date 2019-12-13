import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PlantResponseModel } from '../model/plant-response.model';
import { ConstantsModel } from './constants.model';

@Injectable()
export class PlantApi {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private constants = new ConstantsModel();
	private PLANT_URL = this.constants.BACK_END_URL+'plant';
	private token: String = localStorage.getItem('currentUser');

	constructor(private http?: HttpClient) { }

  async getAllPlants(): Promise<PlantResponseModel> {
    const data: PlantResponseModel = await this.http.get<PlantResponseModel>(this.PLANT_URL + "?token=" + this.token,
    {headers: this.headers}).toPromise();
    return data;
  }
}
