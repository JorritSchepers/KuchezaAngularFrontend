import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';

@Injectable()
export class PlotApi {
    httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
	};

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	plotUrl = 'http://localhost:8088/plot/id/plant';

	constructor(private http?: HttpClient) { }

	query() {
		// console.warn('Sending get request to: ', this.plotUrl, "?");
		// return this.http.get<FarmModel>(this.plotUrl + "?token=" + TokenModel.currentToken, {headers: this.headers})
		// .subscribe(data => this.handleLoginResponse(data));
	}

	// handlePlotResponse(response: FarmModel): void {
	// 	console.warn("FarmModel: ", response);
	// }
}
