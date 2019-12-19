import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PlantModel } from '../model/plant.model';
import { PlotModel } from '../model/plot.model';
import { AllPlotModel } from '../model/allplot.model';
import { ConstantsModel } from './constants.model';
import { AnimalModel } from '../model/animal.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class PlotApi {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');
	private constants = new ConstantsModel();
    private PLOT_URL = this.constants.BACK_END_URL+"plot/";
	private token: String = this.cookieService.get('currentUser');

	constructor(private cookieService: CookieService,private http?: HttpClient) { }

	async harvest(plot: number, plotModel: PlotModel): Promise<PlotModel> {
		try {
			const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/harvest?token=" + this.token, JSON.stringify(plotModel),
			{headers: this.headers}).toPromise();
			return data;
		} catch (err) {
			 console.warn(err.error);
		}
	}

  async placePlantOnPlot(plot: number, plantModel: PlantModel): Promise<PlotModel> {
    try {
      const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/plant?token=" + this.token, JSON.stringify(plantModel),
      {headers: this.headers}).toPromise();
      return data;
    } catch (err) {
	     console.warn(err.error);
    }
  }

  async updateAge(age: number, plotModel: PlotModel): Promise<PlotModel> {
    try {
      const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plotModel.id + "/updateAge/"+age+"?token=" + this.token, JSON.stringify(plotModel),
      {headers: this.headers}).toPromise();
      return data;
    } catch (err) {
    }
  }

	async purchasePlot(plot: number): Promise<AllPlotModel>{
		try {
			const data: AllPlotModel = await this.http.post<AllPlotModel>(this.PLOT_URL+ plot + "/purchase?token=" + this.token,
			{headers: this.headers}).toPromise();
			return data;
		} catch (err) {
			 console.warn(err.error);
		}
	}

	async editWater(plot: number, water: number): Promise<PlotModel>{
		try {
			const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/water/"+water+"?token=" + this.token,
			{headers: this.headers}).toPromise();
			return data;
		} catch (err) {
			console.warn(err.error);
		}
	}

	async updateStatus(plot: number, status: String): Promise<PlotModel>{
		try {
			const data: PlotModel = await this.http.post<PlotModel>(this.PLOT_URL+ plot + "/status/"+status+"?token=" + this.token,
			{headers: this.headers}).toPromise();
			return data;
		} catch (err) {
			console.warn(err.error);
		}
	}

	async placeAnimalOnPlot(plot: number, animalModel: AnimalModel): Promise<AllPlotModel> {
		try {
			const data: AllPlotModel = await this.http.post<AllPlotModel>(this.PLOT_URL+ plot + "/animal?token=" + this.token, JSON.stringify(animalModel),
			{headers: this.headers}).toPromise();
			return data;
		} catch (err) {
			console.warn("Something went wrong with the back-end: ", err);
		}
	}
}
