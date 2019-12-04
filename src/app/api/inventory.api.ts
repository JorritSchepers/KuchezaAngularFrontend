import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { InventoryModel } from '../model/inventory.model';

@Injectable()
export class InventoryApi {
	private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
	private INVENTORY_URL: string = 'http://localhost:8088/inventory';
	private token: String = localStorage.getItem('currentUser');

	constructor(private http?: HttpClient) { }

	async getInventory(): Promise<InventoryModel> {
		const data: InventoryModel = await this.http.get<InventoryModel>(this.INVENTORY_URL + "?token=" + this.token,
		{headers: this.headers}).toPromise();
		return data;
	}
}
