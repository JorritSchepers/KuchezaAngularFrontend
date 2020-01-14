import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { InventoryModel } from '../model/inventory.model';
import { ConstantsModel } from './constants.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InventoryApi {
	private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
	private constants = new ConstantsModel();
	private INVENTORY_URL: string = this.constants.BACK_END_URL+'inventory';
	private token: String = this.cookieService.get('currentUser');

	constructor(private cookieService: CookieService,private http?: HttpClient) { }

	async getInventory(): Promise<InventoryModel> {
		const data: InventoryModel = await this.http.get<InventoryModel>(this.INVENTORY_URL + "?token=" + this.token,
		{headers: this.headers}).toPromise();
		return data;
	}

	async editInventoryWater(water: number): Promise<InventoryModel> {
		const data: InventoryModel = await this.http.post<InventoryModel>(this.INVENTORY_URL + "/"+water+"?token=" + this.token,
		{headers: this.headers}).toPromise();
		return data;
	}
}
