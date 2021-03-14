import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario! : Usuario;

  constructor(private http: HttpClient) { }

  get usuario(){
    return {...this._usuario};
  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const user = {email, password};

    return this.http.post<AuthResponse>(url, user)
            .pipe(
              tap(resp => {
                if(resp.ok){
                  localStorage.setItem('token', resp.token);
                }
              }), 
              map(resp => resp.ok),
              catchError(err => of(err.error.msg))
            )

  }

  registro(nombre: string, email: string, password: string) {

    const url = `${this.baseUrl}/auth/registro`;
    const user = {nombre, email, password};

    return this.http.post<AuthResponse>(url, user)
            .pipe(
              tap(resp => {
                if(resp.ok){
                  localStorage.setItem('token', resp.token);
                }
              }),
              map(resp => resp.ok),
              catchError(err => of(err.error.msg))
            )

  }

  validarToken() {

    const url = `${this.baseUrl}/auth/renew`;
    const token = new HttpHeaders()
                  .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers: token})
              .pipe(
                tap(resp => {
                  localStorage.setItem('token', resp.token);
                  this._usuario = {
                    uid: resp.uid,
                    nombre: resp.nombre,
                    email: resp.email,
                    img: resp.img                                   
                  }
                }),
                map(resp => resp.ok),
                catchError(err => of(false))
              )

  }

  logout() {
    localStorage.removeItem('token');
  }

  /* USUARIOS */

  actualizarUsuario(nombre: string, email: string, archivo: File){

    const url: string = `${this.baseUrl}/usuario/${this._usuario.uid}`;

    const token = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    const form = new FormData();
    form.append('nombre', nombre);
    form.append('email', email);
    form.append('archivo', archivo);

    return this.http.put<AuthResponse>(url, form, {headers : token})
            .pipe(
              tap(resp => {
                if(resp.ok){
                  this._usuario = {
                    uid: resp.uid,
                    nombre: resp.nombre,
                    email: resp.email,
                    img: resp.img
                  }
                }
              })
            )
  }

  listarUsuarios() {
    
    const url: string = `${this.baseUrl}/usuario`;
    const token = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers: token})
            .pipe(
              map(resp => {
                if(resp.ok){
                  return resp.usuariosDB;
                }
              })
            )

  }

}
