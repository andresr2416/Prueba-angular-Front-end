import { URLAPI } from '../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { RegisterResponse } from '../models/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  SolicitarRegistroApi(NuevoUsuario: Usuario): Promise<RegisterResponse> {
    return this.http.post<RegisterResponse>(URLAPI + "api/register", NuevoUsuario).toPromise();
  }
}
