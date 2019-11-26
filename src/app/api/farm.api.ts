import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { FarmModel } from '../model/farm.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../model/token.model';

@Injectable()
export class FarmApi {
    httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'my-auth-token'
		})
	};

	protected headers = new HttpHeaders().set('Content-Type', 'application/json');

	loginUrl = 'http://localhost:8088/farm';

	constructor(private http?: HttpClient) { }

	query() {
		console.warn('Sending get request to: ', this.loginUrl, "?");
		return this.http.get<FarmModel>(this.loginUrl + "?token=" + TokenModel.currentToken, {headers: this.headers})
		.subscribe(data => this.handleLoginResponse(data));
	}

	handleLoginResponse(response: FarmModel): void {
		console.warn("FarmModel: ", response);
	}
}