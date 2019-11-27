import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { PlantModel } from '../model/plant.model';
import { PlotModel } from '../model/plot.model';

@Injectable()
export class PlotApi {
  httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
	};

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private http?: HttpClient) { }

  public async query(plot: number, plantModel: PlantModel): Promise<PlotModel> {
    var plotUrl = new String("http://localhost:8088/plot/"+plot+"/plant");
    try {
      const data: PlotModel = await this.http.post<PlotModel>(plotUrl + "?token=" + TokenModel.currentToken, JSON.stringify(plantModel),
      {headers: this.headers}).toPromise();
      console.warn("PlotModel: ", data);
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }

  public async oogst(plot: number, plantModel: PlantModel): Promise<PlotModel> {
    var plotUrl = new String("http://localhost:8088/plot/"+plot+"/harvest");
    try {
      const data: PlotModel = await this.http.post<PlotModel>(plotUrl + "?token=" + TokenModel.currentToken, JSON.stringify(plantModel),
      {headers: this.headers}).toPromise();
      console.warn("PlotModel: ", data);
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }
}
