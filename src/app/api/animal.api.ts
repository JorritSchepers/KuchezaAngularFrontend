import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AnimalResponseModel } from '../model/animal-response.model';
import { CookieService } from 'ngx-cookie-service';
import { ConstantsModel } from './constants.model';

@Injectable()
export class AnimalApi {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private constants = new ConstantsModel();
  private ANIMAL_URL = this.constants.BACK_END_URL+'animal';
  private token: String = this.cookieService.get('currentUser');

  constructor(private cookieService: CookieService,private http?: HttpClient) { }

  async getAllAnimals(): Promise<AnimalResponseModel> {
    const data: AnimalResponseModel = await this.http.get<AnimalResponseModel>(this.ANIMAL_URL + "?token=" + this.token,
    {headers: this.headers}).toPromise();
    return data;
  }

  async deleteAnimal(animalIDToDelete: number, animalIDToReplaceWith: number): Promise<AnimalResponseModel> {
    const data: AnimalResponseModel = await this.http.delete<AnimalResponseModel>(this.ANIMAL_URL + "/" + animalIDToDelete + "/"
      + animalIDToReplaceWith +  "?token=" + this.token, {headers: this.headers}).toPromise();
      return data;
  }
}
