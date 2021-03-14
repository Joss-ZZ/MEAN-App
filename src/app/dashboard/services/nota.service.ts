import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../../auth/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listarNotas() {

    const url = `${this.baseUrl}/nota`;
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers: token});

  }

  eliminarNota(id: string){

    const url = `${this.baseUrl}/nota/${id}`;
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.delete<AuthResponse>(url, {headers: token});

  }

  agregarNota(descripcion: string){

    const url = `${this.baseUrl}/nota`;
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.post<AuthResponse>(url, {descripcion} ,{headers: token});
  }

  editarNota(id: string, descripcion: string){

    const url = `${this.baseUrl}/nota/${id}`;
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.put<AuthResponse>(url, {descripcion}, {headers: token});

  }

}
