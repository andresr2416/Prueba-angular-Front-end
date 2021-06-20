import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLAPI } from '../constantes';
import { CardsResponse } from '../models/cards-response.model';

@Injectable({
  providedIn: 'root'
})
export class CardsUsuariosService {

  constructor(private http: HttpClient) { }

  SolicitarUsuariosApi(): Promise<CardsResponse> {
    return this.http.get<CardsResponse>(URLAPI + "api/users").toPromise();
  }
}
