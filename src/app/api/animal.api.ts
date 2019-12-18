import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AnimalResponseModel } from '../model/animal-response.model';
import { ConstantsModel } from '../model/constants.model';

@Injectable()
export class AnimalApi {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private constants = new ConstantsModel();
	private ANIMAL_URL = this.constants.BACK_END_URL+'animal';
	private token: String = localStorage.getItem('currentUser');

	constructor(private http?: HttpClient) { }

  async getAllAnimals(): Promise<AnimalResponseModel> {
    const data: AnimalResponseModel = await this.http.get<AnimalResponseModel>(this.ANIMAL_URL + "?token=" + this.token,
    {headers: this.headers}).toPromise();
    return data;
  }
}
