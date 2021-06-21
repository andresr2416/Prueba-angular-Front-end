import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLAPI } from '../constantes';
import { CardsResponse } from '../models/cards-response.model';
import { DataUsuario } from '../models/data-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CardsUsuariosService {

  UsuarioSeleccionado: DataUsuario;

  constructor(private http: HttpClient) { }

  SolicitarUsuariosApi(): Promise<CardsResponse> {
    return this.http.get<CardsResponse>(URLAPI + "api/users").toPromise();
  }

  SolicitarBorradoApi(arg: number): Promise<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(URLAPI + "api/users/" + arg, { observe: 'response' }).toPromise();
  }

  VerificarImagen(url: string): Promise<any> {
    return this.http.get<any>(url).toPromise();
  }
}
