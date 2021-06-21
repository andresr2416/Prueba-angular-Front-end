import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { URLAPI } from '../constantes';
import { CardsResponse } from '../models/cards-response.model';
import { CreateResponse } from '../models/create-response.model';
import { DataUsuario } from '../models/data-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CardsUsuariosService {

  UsuarioSeleccionado: DataUsuario;
  ListaUsuarios: CardsResponse;
  AppComponent: AppComponent;

  constructor(private http: HttpClient) { }

  SolicitarUsuariosApi(): Promise<CardsResponse> {
    return this.http.get<CardsResponse>(URLAPI + "api/users").toPromise();
  }

  SolicitarBorradoApi(arg: number): Promise<HttpResponse<any>> {
    return this.http.delete<void>(URLAPI + "api/users/" + arg, { observe: 'response' }).toPromise();
  }

  SolicitarCreadoApi(arg: DataUsuario): Promise<HttpResponse<CreateResponse>> {
    return this.http.post<CreateResponse>(URLAPI + "api/users", arg, { observe: 'response' }).toPromise();
  }

  SolicitarEditadoApi(arg: DataUsuario): Promise<HttpResponse<CreateResponse>> {
    return this.http.put<CreateResponse>(URLAPI + `api/users/${arg.id}`, arg, { observe: 'response' }).toPromise();
  }

  AgregarUsuario(arg: DataUsuario) {
    this.ListaUsuarios.data.push(arg);
  }

  EditarUsuario(arg: DataUsuario) {
    let indice = this.ListaUsuarios.data.findIndex(x => x.id == arg.id);
    this.ListaUsuarios.data[indice] = { ...arg };
  }
}
