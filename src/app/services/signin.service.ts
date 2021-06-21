import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLAPI } from '../constantes';
import { SigninResponse } from '../models/signin-response.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  SolicitarLoginApi(arg: Usuario): Promise<SigninResponse> {
    return this.http.post<SigninResponse>(URLAPI + "api/login", arg).toPromise();
  }
}
