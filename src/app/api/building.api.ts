import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ConstantsModel } from './constants.model';
import { CookieService } from 'ngx-cookie-service';
import { WaterSourceResponseModel } from '../model/watersource-response.model';

@Injectable()
export class BuildingApi {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private constants = new ConstantsModel();
	private PLANT_URL = this.constants.BACK_END_URL+'building';
	private token: String = this.cookieService.get('currentUser');

	constructor(private cookieService: CookieService,private http?: HttpClient) { }

  async getAllWaterSources(): Promise<WaterSourceResponseModel> {
    const data: WaterSourceResponseModel = await this.http.get<WaterSourceResponseModel>(this.PLANT_URL + "/sources?token=" + this.token,
        {headers: this.headers}).toPromise();
    return data;
  }
}
  