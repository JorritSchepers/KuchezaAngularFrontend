import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';
import { PlantModel } from '../model/plant.model';
import { PlotModel } from '../model/plot.model';

@Injectable()
export class PlotApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private PLOT_URL = "http://localhost:8088/plot/";

	constructor(private http?: HttpClient) { }

  async placePlantOnPlot(plot: number, plantModel: PlantModel): Promise<PlotModel> {
    try {
      const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/plant?token=" + TokenModel.currentToken, JSON.stringify(plantModel),
      {headers: this.headers}).toPromise();
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }

  async oogst(plot: number, plantModel: PlantModel): Promise<PlotModel> {
    try {
      const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/harvest?token=" + TokenModel.currentToken, JSON.stringify(plantModel),
      {headers: this.headers}).toPromise();
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }
}
