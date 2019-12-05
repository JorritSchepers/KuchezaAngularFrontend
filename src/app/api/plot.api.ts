import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { PlantModel } from '../model/plant.model';
import { PlotModel } from '../model/plot.model';

@Injectable()
export class PlotApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private PLOT_URL = "http://localhost:8088/plot/";
	token: String = localStorage.getItem('currentUser');

	constructor(private http?: HttpClient) { }

	async oogst(plot: number, plotModel: PlotModel): Promise<PlotModel> {
		try {
			const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/harvest?token=" + this.token, JSON.stringify(plotModel),
			{headers: this.headers}).toPromise();
			return data;
		} catch (err) {
			 console.warn("Something went wrong with the back-end: ", err);
		}
	}

  async placePlantOnPlot(plot: number, plantModel: PlantModel): Promise<PlotModel> {
    try {
      const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/plant?token=" + this.token, JSON.stringify(plantModel),
      {headers: this.headers}).toPromise();
      return data;
    } catch (err) {
	     console.warn("Something went wrong with the back-end: ", err);
    }
  }

  async updateAge(age: number, plotModel: PlotModel): Promise<PlotModel> {
    try {
      const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plotModel.ID + "/updateAge/"+age+"?token=" + this.token, JSON.stringify(plotModel),
      {headers: this.headers}).toPromise();
      return data;
    } catch (err) {
    }
  }
}
